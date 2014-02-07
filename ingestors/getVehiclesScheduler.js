var request = require('request');
var async = require('async');
var config= require("./config");
var parser = require('xml2json');
var moment = require('./lib/moment.min');

//Here is the core logic to get data from external API map to our structure and post to our API
module.exports.vehiclesScheduler = function(requests,rootCallback){
    var userName=config.user;
    var password=config.password;
    var auth = 'Basic ' + new Buffer(userName + ':' + password).toString('base64');
    request({
        url:config.getRoutesUrl,
        method:"GET",
        headers:{'Authorization': auth}
    },function(err, res, body){
        if(body){
            try{
                var data = JSON.parse(body);
                data = JSON.parse(data);
                var routes = data.routes;
                var start =0;
                var end=0;
                var fixes=[];
                if(routes){
                    async.whilst(
                        function () { return end < routes.length; },
                        function (callback) {
                            end+=10;
                            if(end>routes.length)
                                end=routes.length;
                            var temp="";
                            while(start<end){
                                var route = routes[start];
                                temp=temp+route.rt+",";
                                start++;
                            }
                            temp = temp.substring(0,temp.length-1);
                            var key = "";
                            if(requests<=config.key1RequestLimit)
                                key = config.key1;
                            else
                                key = config.key2;
                            var requestTime = moment().format("YYYY-MM-DDTHH:mm:ss")+"Z";
                            request({
                                url:config.getVehiclesUrl+"?key="+key+"&rt="+temp,
                                method:"GET",
                                timeout:20000
                            },function(err, res, body){
                                requests++;
                                if(requests==(config.key1RequestLimit+config.key2RequestLimit))
                                    requests=0;

                                if(err)
                                    callback();
                                else{
                                    var json = parser.toJson(body);
                                    json = JSON.parse(json);
                                    var vehicles = json['bustime-response'].vehicle;
                                    if(vehicles){
                                        async.forEach(vehicles,function(vehicle,vehicleCallback){
                                            var record={};
                                            var intervalTime = moment().format("YYYY-MM-DDTHH:mm:ss")+"Z";
                                            for(var key in dataMapping){
                                                if(key=="requesttime")
                                                    record[key]=requestTime;
                                                else if(key == "intervaltime")
                                                    record[key]=intervalTime;
                                                else if(dataMapping[key] instanceof Array){
                                                    var arr = dataMapping[key];
                                                    var temp = [];
                                                    for(var ky in arr){
                                                        temp.push(vehicle[arr[ky]]);
                                                    }
                                                    record[key]=temp;
                                                }
                                                else{
                                                    if(key=="fixtime")
                                                        record[key]=formatDate(vehicle[dataMapping[key]]);
                                                    else
                                                        record[key]=vehicle[dataMapping[key]];
                                                }
                                            }
                                            fixes.push(record);
                                            vehicleCallback();
                                        },function(err){
                                            callback();
                                        })
                                    }
                                    else
                                        callback();
                                }
                            })

                        },
                        function (err) {
                            request({
                                url:config.postFixesUrl,
                                method:"POST",
                                headers:{'Authorization': auth},
                                json:{"fixes":fixes}
                            },function(err, res, body){
                                if(err)
                                    rootCallback(new Error("Unable to post data."),requests);
                                else
                                    rootCallback(null,requests);
                            })
                        }
                    );
                }
                else
                rootCallback(new Error("While getting routes."),requests);
            }
            catch(e){
                rootCallback(e,requests);
            }
        }
        else{
            rootCallback(err,requests);
        }
    })
}

// Here we define mapping of data coming from external source to our structure
var dataMapping ={
    "id":"vid",
    "fixtime":"tmstmp",
    "requesttime":"",
    "intervaltime":"",
    "coordinates":["lon","lat"],
    "heading":"hdg",
    "destination":"des",
    "patternid":"pid",
    "pdist":"pdist"
}

// This method is used to format date coming from bus tracker API
var formatDate = function(date){
    try{
        var arr = date.split(" ");
        var resultDate = "";
        resultDate = arr[0].substring(0,4);
        resultDate = resultDate+"-"+arr[0].substring(4,6);
        resultDate = resultDate+"-"+arr[0].substring(6,8);
        resultDate = resultDate+"T"+arr[1]+"Z";
        return resultDate;
    }
    catch(e){
        return moment().format("YYYY-MM-DDTHH:mm:ss")+"Z";
    }
}