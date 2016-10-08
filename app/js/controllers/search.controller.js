/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('searchController', function ($location, $timeout) {

        var searchCtrl = this;

        var timeout;

        searchCtrl.search = function () {
            $timeout.cancel(timeout);

            if (searchCtrl.query) {
                $location.path('/results').search('q', searchCtrl.query);
            }
        };

        searchCtrl.keyup = function () {
            timeout = $timeout(searchCtrl.search, 1000);
        }

        searchCtrl.keydown = function () {
            $timeout.cancel(timeout);
        };

    });