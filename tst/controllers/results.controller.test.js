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

    var $controller;
    var $q;
    var $rootScope;
    var omdbApi;
    var resultsCtrl;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$controller_, _$q_, _omdbApi_, _$rootScope_) {
        $controller = _$controller_;
        $q = _$q_;
        omdbApi = _omdbApi_;
        $rootScope = _$rootScope_;

        spyOn(omdbApi, 'search').and.callFake(function () {
            // return $q.defer().promise;

            var deferred = $q.defer();
            deferred.resolve(response);
            return deferred.promise;
        });
    }));

    it("should load search results", function () {
        resultsCtrl = $controller('resultsController');

        $rootScope.$apply(); // Need to call this when mocking ajax calls ($digest might work also)

        expect(resultsCtrl.results[0].Title).toBe(response.data.Search[0].Title);
        expect(resultsCtrl.results[1].Title).toBe(response.data.Search[1].Title);
        expect(resultsCtrl.results[2].Title).toBe(response.data.Search[2].Title);
        

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

});