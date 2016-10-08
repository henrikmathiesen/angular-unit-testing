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
            $timeout(searchCtrl.search, 1000);
        }

        // maybe should do it like this instead
        // https://github.com/henrikmathiesen/angularArchitecture/blob/master/app/shared/debounce-input.directive.js

    });