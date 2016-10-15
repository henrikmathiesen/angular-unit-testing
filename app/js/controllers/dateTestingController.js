/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('dateTestingController', function(){
        
        // The porpuse with this controller is just test the behavior of dates

        var d01 = new Date();
        console.log(d01);
        // Sat Oct 15 2016 16:26:13 GMT+0200 (Västeuropa, sommartid)
        // Greenwich Mean Time (GMT) is the global reference for time
        // Sweden is 2 hours ahead of it during summer time, and 1 hour ahead in winter time

        console.log(d01.getUTCHours());
        // 14
        // UTC hours is 2 hours earlier than sweden time (during summer time)
        // UTC and GMT is the same, but technically not
        // GMT is a time zone and UTC is a time standard.
        // https://www.timeanddate.com/time/gmt-utc-time.html

        console.log(d01.toISOString());
        // 2016-10-15T14:39:58.545Z
        // .545 is milliseconds
        // Z at the end stands for 'zero time' or 'zulu time'
        // It means that the time is measured in UTC

        

        var d02 = new Date('2016-10-15 16:15:10');
        console.log(d02);
        // We can construct dates by using strings

        var d03 = new Date('2016-10-15T16:15:10');
        console.log(d03);

    });