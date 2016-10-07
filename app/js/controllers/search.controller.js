/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('searchController', function ($location, $timeout) {

        var searchCtrl = this;

        var timeout;

        searchCtrl.search = function () {
            if (searchCtrl.query) {
                $location.path('/results').search('q', searchCtrl.query);
            }
        };

        searchCtrl.keyup = function () {
            
        }

    });