/// <reference path="../../typings/index.d.ts" />

describe("popularMovies service test", function () {

    var PopularMovies;
    var $httpBackend;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_PopularMovies_, _$httpBackend_) {
        PopularMovies = _PopularMovies_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function () {
        // Verifies that all of the requests defined via the expect api were made. If any of the requests were not made, 
        // verifyNoOutstandingExpectation throws an exception.

        $httpBackend.verifyNoOutstandingExpectation();
    });

    it("should create a popular movie", function () {

        var expectedData = function (data) {
            console.log(angular.mock.dump(data));
            return true;
        };

        $httpBackend.expectPOST('popular/tt0076759', expectedData)
            .respond(201);

        var popularMovie = new PopularMovies({
            id: 'tt0076759',
            description: 'Great movie!'
        });

        popularMovie.$save();

        expect($httpBackend.flush).not.toThrow();
    });

});

// I think this is how it works
// $httpBackend.flush is needed to get the data out from the promise
// With flush(), we also need $httpBackend.verifyNoOutstandingExpectation()
// in omdb service test we dont need those calls