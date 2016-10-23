/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .filter('fromNowFilterNoConversion', function () {
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