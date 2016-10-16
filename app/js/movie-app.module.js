/// <reference path="../../typings/index.d.ts" />

angular.module('movie-app', ['ngRoute', 'ngResource', 'ui.bootstrap', 'templates'])
    .config(function ($routeProvider, $logProvider) {
        
        // This disabled $log to console for .debug() (default false)
        $logProvider.debugEnabled(false);

        $routeProvider
            .when('/', {
                templateUrl: 'app/templates/home.template.html',
                controller: 'homeController as homeCtrl'
            })
            .when('/results', {
                templateUrl: 'app/templates/results.template.html',
                controller: 'resultsController as resultsCtrl'
            })
            .otherwise({ redirectTo: '/' });
    });
