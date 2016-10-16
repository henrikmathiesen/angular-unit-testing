/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('homeController', function ($log, $interval, omdbApi, PopularMovies) {
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

        var findMovie = function (id) {
            omdbApi.find(id)
                .then(function (response) {
                    homeCtrl.result = response.data;
                });
        };

        // We get back to this
        //PopularMovies.get()
         //   .then(function (data) {

                var data = ['tt0076759', 'tt0080684', 'tt0086190'];

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
                
          //  });
    });