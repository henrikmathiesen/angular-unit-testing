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

    it("should create a popular movie via POST", function () {

        // var expectedData = function (postData) {
        //     console.log(angular.mock.dump(postData));
        //     //return (JSON.parse(postData).id) === 'tt0076759'; , see bellow for Angulars api doing the same thing
        //     return (angular.fromJson(postData).id) === 'tt0076759';          // if this does not equal true then the test will fail
        // };

        var expectedData = '{"id":"tt0076759","description":"Great movie!"}';   // if this does not exactly match post data, then test fails, as an extra test

        // can also type it like this
        // $httpBackend.whenPOST('popular/tt0076759', expectedData)
        //     .respond(201);

        $httpBackend.when('POST', 'popular/tt0076759', expectedData)
            .respond(201);

        var popularMovie = new PopularMovies({
            id: 'tt0076759',
            description: 'Great movie!'
        });

        popularMovie.$save();

        expect($httpBackend.flush).not.toThrow();
    });

    it("should use our custom method to do a PUT", function () {
        var expectedData = function (postData) {
            console.log(angular.mock.dump(postData));
            return true;
        };

        $httpBackend.when('PUT', 'popular/tt0076759', expectedData)
            .respond(200);

        var popularMovie = new PopularMovies({
            id: 'tt0076759',
            description: 'Great movie again!'
        });

        popularMovie.$update();

        expect($httpBackend.flush).not.toThrow();
    });

    it("should get popular movie by id", function () {                          // We could have used the url as a string as second argument
        $httpBackend.when('GET', function (url) {
            console.log("GET URL: " + url);                                     // With a callback function like this, we can log the url
            return url === 'popular/tt0076759';                                 // Again, this must return true, else test fails 
        }).respond(200);

        // OBS: static method for GET, also no $ prefix
        PopularMovies.get({ id: 'tt0076759' });
    });

});

// I think this is how it works
// $httpBackend.flush is needed to get the data out from the promise
// With flush(), we also need $httpBackend.verifyNoOutstandingExpectation()
// in omdb service test we dont need those calls

// $httpBackend.when vs $httpBackend.expect
// when:    best for working with data, use in any order, reuse allowed
// expect:  best for testing exact usage of an api, orders matter, reuse not allowed, if any request wasnt made then test fails