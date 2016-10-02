/// <reference path="../../typings/index.d.ts" />

angular.module('movie-app', ['ngRoute', 'ngResource', 'ui.bootstrap'])
    .config(function ($routeProvider) {
        
        $routeProvider
            .when('/results', {
                templateUrl: '',
                controller: 'resultsController as resultsCtrl'
            })
            .otherwise({ redirectTo: '/' });
    });
