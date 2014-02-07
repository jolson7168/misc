var http = require('http');
var scheduler = require('./getVehiclesScheduler');
var moment = require('./lib/moment.min');

process.on('uncaughtException', function (err) {
    console.log("Node NOT Exiting...");
    console.log(err);
});

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello");
}).listen(8080);

var requests=0;
var runScheduler = function(requests){
    setTimeout(function(){
        console.log("Scheduler Started : "+new Date());
        scheduler.vehiclesScheduler(requests,function(err,num){
            if(err)
            console.log(err);
            console.log("Scheduler End : "+new Date());
            console.log("Total Requests executed: "+num);
            runScheduler(num);
        })
    },30000)
}

runScheduler(requests);



