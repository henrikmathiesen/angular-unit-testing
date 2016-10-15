/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .filter('fromNowFilter', function () {
        return function (value) {
            if (!value) {
                throw "date value can not be undefined";
            }
        }
    });