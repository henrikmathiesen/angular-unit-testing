/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .directive('movieResult', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                result: '='
            },
            template: '<div>{{ result.Title }}</div>'
        }
    });