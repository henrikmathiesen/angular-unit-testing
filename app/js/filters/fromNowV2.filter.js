/// <reference path="../../../typings/index.d.ts" />

// Expects a date object, or ISO string with correct time zone offset

angular
    .module('movie-app')
    .filter('fromNowFilterV2', function () {
        return function (value, baseDate) {
            if(!value) {
                return "";
            }
            
            var currentYear = baseDate ? new Date(baseDate).getFullYear() : new Date().getFullYear();
            var compareDate = new Date(value).getFullYear();
            
            var yearDiff = currentYear - compareDate;

            return yearDiff == 1 ? "1 year ago" : yearDiff + " years ago";
        }
    });
