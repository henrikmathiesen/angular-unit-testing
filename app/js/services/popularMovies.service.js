/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .factory('PopularMovies', function ($resource) {
        return $resource('popular/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    });