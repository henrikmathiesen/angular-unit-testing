/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .filter('fromNowFilter', function () {
        return function (value) {
            if(!value || !angular.isDate(value)) {
                console.error("ERROR: value must be date object");
                return "ERROR: value must be date object";
            }
            
            return value;
        }
    });