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

        

        var d02 = new Date('2016-10-15:16:15:10');
        console.log(d02);
        // We can construct dates by using strings
        // Sat Oct 15 2016 16:15:10 GMT+0200 (Västeuropa, sommartid)

        var d03 = new Date('2016-10-15T16:15:10');
        console.log(d03);
        // If we use this format, OBS T, we are using ISO time string, Z is default which means UTC
        // In the console it is logged as Sat Oct 15 2016 18:15:10 GMT+0200 (Västeuropa, sommartid)
        // since sweden is 2 hour ahead of UTC time (during summer time)

        // The time zone offset is either -120 in the summer or -60 in the winter (UTC is -120 or -60 before sweden time)
        var timeZoneOffSet = new Date().getTimezoneOffset() == -120 ? '02:00' : '01:00';
        var d04 = new Date('2016-10-15T16:15:10+' + timeZoneOffSet);
        console.log(d04);
        // Here we specify the offset and the correct time is logged

        // When specifying string dates like d02, this problem does not arrise

    });