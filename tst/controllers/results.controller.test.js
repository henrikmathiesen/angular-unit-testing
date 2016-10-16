/// <reference path="../../typings/index.d.ts" />

describe("results controller test", function () {

    var response = {
        data: {
            Search: [
                {
                    Title: "Star Wars: Episode IV - A New Hope",
                    Year: "1977",
                    imdbID: "tt0076759",
                    Type: "movie"
                },
                {
                    Title: "Star Wars: Episode V - The Empire Strikes Back",
                    Year: "1980",
                    imdbID: "tt0080684",
                    Type: "movie"
                },
                {
                    Title: "Star Wars: Episode VI - Return of the Jedi",
                    Year: "1983",
                    imdbID: "tt0086190",
                    Type: "movie"
                }
            ]
        }
    };

    var responseNoHits = {
        data: {
            Error: true
        }
    };

    var $controller;
    var $q;
    var $rootScope;
    var omdbApi;
    var resultsCtrl;
    var $location;
    var $exceptionHandler;

    beforeEach(module('movie-app'));

    beforeEach(module(function($exceptionHandlerProvider) {
        // This is unit test provider
        $exceptionHandlerProvider.mode('log'); // 'rethrow' (also logs, but we have to handle the exception in the test)
    }));

    beforeEach(inject(function (_$controller_, _$q_, _omdbApi_, _$rootScope_, _$location_, _$exceptionHandler_) {
        $controller = _$controller_;
        $q = _$q_;
        omdbApi = _omdbApi_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        $exceptionHandler = _$exceptionHandler_;
    }));

    it("should load search results", function () {

        spyOn(omdbApi, 'search').and.callFake(function () {
            // return $q.defer().promise;

            var deferred = $q.defer();
            deferred.resolve(response);
            return deferred.promise;
        });

        $location.search('q', 'star wars');

        resultsCtrl = $controller('resultsController');

        $rootScope.$apply(); // Need to call this when mocking ajax calls ($digest might work also)

        expect(resultsCtrl.results[0].Title).toBe(response.data.Search[0].Title);
        expect(resultsCtrl.results[1].Title).toBe(response.data.Search[1].Title);
        expect(resultsCtrl.results[2].Title).toBe(response.data.Search[2].Title);
        expect(omdbApi.search).toHaveBeenCalledWith('star wars');


        // Our test failed
        // resultsCtrl.results set in a then callback of omdbApi.search is not working when tested
        // The test CAN find an instance of omdbApi since movie-app is included in test but it is not enough, the promise is not resolved
        // We COULD solve this by using $httpBackend but that would test the omdbApi again
        // In this test we are only interested in the controller logic

        // We do NOT need to include omdbApi as service in controller injection
        // Service WILL run in the controller
        // We spy on the service method that controller calls
        // Its not enough to use callFake, it MUST match the implementation of the real method
        // It must return the same object as the service so controller can run the same logic, then > if !response.data.Error ... (data needs to be defined)

        // If we where not interested in testing the response from ajax call but just wanted to get rid of test error 'unexpected GET request'
        // then we could just return $q.defer().promise; from mocked service
    });

    it("should handle no search results", function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(responseNoHits);
            return deferred.promise;
        });

        $location.search('q', 'mumbo jumbo');

        resultsCtrl = $controller('resultsController');

        $rootScope.$apply();

        expect(resultsCtrl.results.length).toBe(0);
    });

    it("should handle errors", function () {
        spyOn(omdbApi, 'search').and.callFake(function () {
            var deferred = $q.defer();
            deferred.reject("Something went wrong!");
            return deferred.promise;
        });

        $location.search('q', 'star wars');

        //resultsCtrl = $controller('resultsController');

        //$rootScope.$apply();

        //expect(resultsCtrl.errorMessage).toBe("ERROR: something went wrong");

        // react to throw "Something went wrong!";
        // or $exceptionHandler(e); where e is message in .reject()
        // expect(function(){
        //     resultsCtrl = $controller('resultsController');
        //     $rootScope.$apply();
        // }).toThrow("Something went wrong!");

        // $exceptionHandlerProvider.mode('rethrow');
        // is the default mode (see beforeEach)

        // If we however change this to 'log'
        // we no longer rethrows the exception and the test above fails
        // The exception is cought and stored as a list internally

        resultsCtrl = $controller('resultsController');
        $rootScope.$apply();

        expect($exceptionHandler.errors).toEqual(['Something went wrong!']);

    });

});