/// <reference path="../../../typings/index.d.ts" />


angular
    .module('movie-app')
    .filter('fromNowFilterV2', function () {
        return function (value, baseDate) {
            if(!value) {
                return "";
            }
            
            var currentYear = baseDate ? new Date(baseDate).getUTCFullYear() : new Date().getFullYear();
            var compareDate = new Date(value).getUTCFullYear();
            
            var yearDiff = currentYear - compareDate;

            return yearDiff == 1 ? "1 year ago" : yearDiff + " years ago";
        }
    });