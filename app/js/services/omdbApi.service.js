/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .factory('omdbApi', function ($http) {
        var factory = {};

        var baseUrl = 'http://www.omdbapi.commm/?'

        factory.search = function (query) {
            // teacher does this encodeURIComponent(query);
            return $http.get(baseUrl + 's=' + query);
        }

        factory.find = function (id) {
            return $http.get(baseUrl + 'i=' + id + '&plot=full');
        }

        return factory;
    });