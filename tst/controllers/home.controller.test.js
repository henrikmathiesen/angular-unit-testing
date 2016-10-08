/// <reference path="../../typings/index.d.ts" />

describe("home controller test", function () {

    var response = [
        {
            data: {
                Title: "Star Wars: Episode IV - A New Hope",
                Year: "1977",
                imdbID: "tt0076759",
                Type: "movie"
            }
        },
        {
            data: {
                Title: "Star Wars: Episode V - The Empire Strikes Back",
                Year: "1980",
                imdbID: "tt0080684",
                Type: "movie"
            }
        },
        {
            data: {
                Title: "Star Wars: Episode VI - Return of the Jedi",
                Year: "1983",
                imdbID: "tt0086190",
                Type: "movie"
            }
        }
    ];

    var $controller;
    var $interval;
    var homeCtrl;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$q_, _PopularMovies_) {
        spyOn(_PopularMovies_, 'get').and.callFake(function () {
            var deferred = _$q_.defer();
            deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190']);
            return deferred.promise;
        });
    }));

    beforeEach(inject(function (_$q_, _omdbApi_) {
        spyOn(_omdbApi_, 'find').and.callFake(function () {
            var deferred = _$q_.defer();

            var args = _omdbApi_.find.calls.mostRecent().args[0];

            if (args === 'tt0076759') {
                deferred.resolve(response[0]);
            }
            else if (args === 'tt0080684') {
                deferred.resolve(response[1]);
            }
            else if (args === 'tt0086190') {
                deferred.resolve(response[2]);
            }
            else {
                deferred.reject();
            }

            return deferred.promise;
        });
    }));

    beforeEach(inject(function (_$controller_, _$interval_, _$rootScope_, _omdbApi_, _PopularMovies_) {
        $controller = _$controller_;
        $interval = _$interval_;

        homeCtrl = $controller('homeController', { $interval: _$interval_, omdbApi: _omdbApi_, PopularMovies: _PopularMovies_ });
        _$rootScope_.$apply();
    }));

    it("should rotate movies every 5 seconds", function () {

        expect(homeCtrl.result).toBeDefined();

        expect(homeCtrl.result.Title).toBe(response[0].data.Title, "should have a default movie");

        $interval.flush(5000);
        expect(homeCtrl.result.Title).toBe(response[1].data.Title, "should have second movie after 5 seconds");

        $interval.flush(5000);
        expect(homeCtrl.result.Title).toBe(response[2].data.Title, "should have third movie after 10 seconds");

        $interval.flush(5000);
        expect(homeCtrl.result.Title).toBe(response[0].data.Title, "should return to the first movie");
    });

});