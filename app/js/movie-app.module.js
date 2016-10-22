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
    })
    .run(function($httpBackend){

        // We mock ajax calls here

        var data = ['tt0076759', 'tt0080684', 'tt0086190'];

        // This is essential, else normal ajax calls breaks
        $httpBackend.whenGET(/^\w+.*/).passThrough();

    });


    /*
        About ngMockE2E module
        - Back end less development
        - Includes only one service: $httpBackend
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
