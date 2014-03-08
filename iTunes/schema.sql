Create table itunes (
    songName	    	varchar2(250),
    Artist          	varchar2(250),
    Composer        	varchar2(250),
    Album           	varchar2(250),
    theGrouping     	varchar2(250),
    Genre           	varchar2(250),
    theSize        	integer,
    theTime         	integer,
    DiscNumber      	integer,
    DiscCount       	integer,
    TrackNumber     	integer,
    TrackCount      	integer,
    theYear         	integer,
    DateModified	date,
    DateAdded       	date,
    BitRate         	integer,
    SampleRate      	integer,
    VolumeAdjustment    integer,
    Kind            	varchar2(250),
    Equalizer       	integer,
    Comments        	integer,
    Plays           	integer,
    LastPlayed      	date,
    Skips           	integer,
    LastSkipped     	date,
    MyRating        	varchar2(250),
    diskLocation    	varchar2(500)
);

CREATE TABLE IGNOREARTISTS  ( 
	ARTIST	VARCHAR2(200) NULL 
	);

CREATE TABLE Charts2  ( 
	CHARTWEEK	DATE NULL,
	THERANK  	NUMBER(*, 0) NULL,
	SONG     	VARCHAR2(250) NULL,
	ARTIST   	VARCHAR2(500) NULL 
	);


CREATE TABLE charts  ( 
	CHARTWEEK   	DATE NULL,
	THERANK     	NUMBER(*, 0) NULL,
	SONG        	VARCHAR2(250) NULL,
	ARTIST      	VARCHAR2(500) NULL,
	ARTISTSTATUS	VARCHAR2(500) NULL,
	SONGSTATUS  	VARCHAR2(500) NULL,
	ARTISTNUM   	NUMBER(*, 0) NULL,
	SONGNUM     	NUMBER(*, 0) NULL 
	);

CREATE TABLE FILENAME  ( 
	FILENAME 	VARCHAR2(200) NULL,
	LINE     	VARCHAR2(500) NULL,
	THEROWNUM	VARCHAR2(100) NULL 
	);


CREATE TABLE FILENAME2  ( 
	FILEDATE 	DATE NULL,
	LINE     	VARCHAR2(250) NULL,
	THEROWNUM	NUMBER(*, 0) NULL 
	);


