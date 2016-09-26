/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .factory('omdbApi', function ($http) {
        var factory = {};

        var baseUrl = 'http://www.omdbapi.com/?'

        factory.search = function (query) {
            return $http.get(baseUrl + 's=' + query);
        }

        factory.find = function (id) {
            return $http.get(baseUrl + 'i=' + id + '&plot=full');
        }

        return factory;
    });