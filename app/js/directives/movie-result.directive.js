/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .directive('movieResult', function(){
        return {
            template: '<div>Star Wars: Episode IV - A New Hope</div>'
        }
    });