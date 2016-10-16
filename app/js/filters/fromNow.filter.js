/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .filter('fromNowFilter', function () {
        return function (value, baseDate) {
            if(!value) {
                return "";
            }
            
            var currentYear = baseDate ? new Date(baseDate).getFullYear() : new Date().getFullYear();
            var compareDate = new Date(value);
            
            var compareDateMs = compareDate.getTime();
            var timeZoneOffSetMs = compareDate.getTimezoneOffset() * 60 * 1000;

            var compareDateLocalTimeZone = new Date(compareDateMs + timeZoneOffSetMs);
            var compareDateLocalTimeZoneYear = compareDateLocalTimeZone.getFullYear();

            var yearDiff = currentYear - compareDateLocalTimeZoneYear;

            return yearDiff == 1 ? "1 year ago" : yearDiff + " years ago";
        }
    });