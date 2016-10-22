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
    var $log;
    var homeCtrl;

    beforeEach(module('movie-app'));

    // Dont need this since we are using movie-app module and it has set it to true
    // But suppose we toggle it there, based on 'debug/isProduction' mode
    // Then we can override it here, so it always works in out tests
    beforeEach(module(function ($logProvider) {
        $logProvider.debugEnabled(true);
    }));

    beforeEach(inject(function (_$q_, _PopularMovies_) {
        spyOn(_PopularMovies_, 'query').and.callFake(function (cb) {
            // var deferred = _$q_.defer();
            // deferred.resolve(['tt0076759', 'tt0080684', 'tt0086190']);
            // return deferred.promise;
            cb(['tt0076759', 'tt0080684', 'tt0086190']);
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

    beforeEach(inject(function (_$controller_, _$interval_, _$log_, _$rootScope_, _omdbApi_, _PopularMovies_) {
        $controller = _$controller_;
        $interval = _$interval_;
        $log = _$log_;

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

    it("should log messages", function () {
        console.log(angular.mock.dump($log.log.logs));
        console.log(angular.mock.dump($log.info.logs));
        console.log(angular.mock.dump($log.error.logs));
        console.log(angular.mock.dump($log.warn.logs));
        console.log(angular.mock.dump($log.debug.logs));

        expect($log.debug.logs[0]).toEqual(["debug log 1", "param 1"]);
        expect($log.debug.logs[1]).toEqual(["debug log 2"]);

        $log.reset(); // a method on the mock version of $log

        console.log(angular.mock.dump($log.log.logs));
        console.log(angular.mock.dump($log.info.logs));
        console.log(angular.mock.dump($log.error.logs));
        console.log(angular.mock.dump($log.warn.logs));
        console.log(angular.mock.dump($log.debug.logs));

        $log.assertEmpty(); // another method on the mock version of $log
    });

});