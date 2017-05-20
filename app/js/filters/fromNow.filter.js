/// <reference path="../../../typings/index.d.ts" />

// Expects UTC time
// http://wisercoder.com/how-to-convert-javascript-dates-to-utc/

angular
    .module('movie-app')
    .filter('fromNowFilter', function () {
        return function (value, baseDate) {
            if (!value) {
                return "";
            }

            var currentYear = baseDate ? new Date(baseDate).getUTCFullYear() : new Date().getUTCFullYear();
            var compareDate = new Date(value).getUTCFullYear();
            var yearDiff = currentYear - compareDate;
            
            return yearDiff == 1 ? "1 year ago" : yearDiff + " years ago";
        }
    });
