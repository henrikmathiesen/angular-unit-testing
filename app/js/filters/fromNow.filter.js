/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .filter('fromNowFilter', function () {
        return function (value) {
            if(!value) {
                console.error("ERROR: pass date object or date as string");
                return "ERROR: value must be date object";
            }
            
            return value;
        }
    });

    // Include moment.js