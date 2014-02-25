OPTIONS (SKIP=1,ERRORS = 100)
load data
infile '/tmp/music3.csv'
APPEND into table mine
TRAILING NULLCOLS
(
        songName        CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"',
        Artist          CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"',
        Composer        CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"',
        Album           CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"',
        theGrouping     CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"',
        Genre           CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"',
        theSize         integer external TERMINATED BY ',',
        theTime         integer external TERMINATED BY ',',
        DiscNumber      integer external TERMINATED BY ',',
        DiscCount       integer external TERMINATED BY ',',
        TrackNumber     integer external TERMINATED BY ',',
        TrackCount      integer external TERMINATED BY ',',
        theYear         integer external TERMINATED BY ',',
        DateModified    DATE "MM/DD/YY HH:MI AM" TERMINATED BY ',',
        DateAdded       DATE "MM/DD/YY HH:MI AM" TERMINATED BY ',',
        BitRate         integer external TERMINATED BY ',',
        SampleRate      integer external TERMINATED BY ',',
        VolumeAdjustment    integer external TERMINATED BY ',',
        Kind            CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"',
        Equalizer       integer external TERMINATED BY ',',
        Comments        CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"',
        Plays           integer external TERMINATED BY ',',
        LastPlayed      DATE "MM/DD/YY HH:MI AM" TERMINATED BY ',',
        Skips           integer external TERMINATED BY ',',
        LastSkipped     DATE "MM/DD/YY HH:MI AM" TERMINATED BY ',',
        MyRating        CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"',
        diskLocation    CHAR TERMINATED BY ',' OPTIONALLY ENCLOSED BY'"'
)
