/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .filter('fromNowFilter', function () {
        return function (value) {
            if(!value) {
                return "";
            }

            // With ISO strings, we need to handle time zone offsets
            if(value.indexOf('T') > -1) {
                var timeZoneOffSet = new Date().getTimezoneOffset();
                
                if(value.indexOf('Z') > -1) {
                    value = value.split('Z')[0];
                }

                value = value + timeZoneOffSet;
            }

            var year = new Date(value).getFullYear();
            var currentYear = new Date().getFullYear();
            var yearDiff = currentYear - year;

            return yearDiff == 1 ? "1 year ago" : yearDiff + " years ago"; 
        }
    });