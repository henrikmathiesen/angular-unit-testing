/// <reference path="../../typings/index.d.ts" />

angular.module('movie-app', ['ngRoute', 'ngResource', 'ngMockE2E', 'ui.bootstrap', 'templates'])
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


    /*
        About ngMockE2E
        - Back end less development
        - Include in module dependencies
        - Reference the script file, 'node_modules/angular-mocks/angular-mocks.js', else error
        - Handle unexpected GET request
        - Can return mock for all http verbs
        - Can pass through requests to become real request
        - Dont need to flush()
        - We can NOT use ngMockE2E:s $httpBackend in unit tests 

        This module gives access to $httpBackend, which in this context is the in browser variant of the unit test variant 
        _$httpBackend_ which is injectable (when node_modules/angular-mocks/angular-mocks.js is in karma.conf.js of course) 

     */
