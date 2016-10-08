/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('homeController', function ($interval, omdbApi, PopularMovies) {
        var homeCtrl = this;

        homeCtrl.result = {};

        var index = 0;

        var findMovie = function (id) {
            omdbApi.find(id)
                .then(function (response) {
                    console.log(response);
                    homeCtrl.result = response.data;
                });
        };

        //PopularMovies.get()
         //   .then(function (data) {

                var data = ['tt0076759', 'tt0080684', 'tt0086190'];

                findMovie(data[index]);

                $interval(function () {
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