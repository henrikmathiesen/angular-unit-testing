/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .factory('popularMovies', function ($resource) {
        var factory = {};

        factory.update = function(){
            return $resource('popular/:id', { id: '@id' }, {
                update: {
                    method: 'PUT'
                }
            });
        };

        return factory;
    });