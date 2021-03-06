/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('homeController', function ($log, $interval, $exceptionHandler, omdbApi, PopularMovies) {
        var homeCtrl = this;

        $log.log("standard log");
        $log.info("info log");
        $log.error("error log");
        $log.warn("warning log");
        $log.debug("debug log 1", "param 1");
        $log.debug("debug log 2");

        homeCtrl.result = {};

        var index = 0;
        var interval;

        var errorHandler = function (e) {
            $exceptionHandler(e, "Something went wrong with omdbApi");
        }

        var findMovie = function (id) {
            omdbApi.find(id)
                .then(function (response) {
                    if(!response.data.Error) {
                        homeCtrl.result = response.data;
                    }
                    else {
                        // No match
                        homeCtrl.result = null;
                    }

                })
                .catch(errorHandler);
        };

        // When using array as a response (in mock $httpBackend), we have to use $resource query method
        PopularMovies.query(function (data) {
            findMovie(data[index]);

            interval = $interval(function () {
                // cycle through a movie every 5 seconds, repeat

                if (index < (data.length - 1)) {
                    index++;
                }
                else {
                    index = 0;
                }

                findMovie(data[index]);

            }, 5000);
        })

    });