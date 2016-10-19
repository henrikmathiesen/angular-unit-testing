/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('resultsController', function ($exceptionHandler, $location, omdbApi) {

        var resultsCtrl = this;

        var query = $location.search().q;

        var errorHandler = function (e) {
            //resultsCtrl.errorMessage = "ERROR: something went wrong";
            //throw "Something went wrong!";
            
            // This rethrows the error, logging it to console
            // We could have however (if not for failing unit tests) overwritten the $exceptionHandler to do more, see services
            $exceptionHandler(e, "Something went wrong with omdbApi");
        };

        var scrollToMovieId = function (imdbID) {
            angular.element('html, body').animate({
                scrollTop: angular.element('#movie-result-' + imdbID).offset().top
            });
        };

        omdbApi.search(query)
            .then(function (response) {
                if (!response.data.Error) {
                    resultsCtrl.results = response.data.Search;
                }
                else {
                    // No hits
                    resultsCtrl.results = [];
                }
            })
            .catch(errorHandler);

        resultsCtrl.toggleAccordian = function (isOpen, imdbID, index) {
            if (isOpen) {
                omdbApi.find(imdbID)
                    .then(function (response) {
                        resultsCtrl.results[index].movieDetails = response.data;
                        scrollToMovieId(imdbID);
                    })
                    .catch(errorHandler);
            }
        };

    });