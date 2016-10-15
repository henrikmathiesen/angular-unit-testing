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

        var d02 = new Date('2016-10-15 16:26:13');
        console.log(d02);
        // We can construct dates by using strings

        
    });