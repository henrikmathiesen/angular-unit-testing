/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('searchController', function ($location) {

        var searchCtrl = this;

        searchCtrl.search = function () {
            if (searchCtrl.query) {
                $location.path('/results').search('q', searchCtrl.query);
            }
        };

    });