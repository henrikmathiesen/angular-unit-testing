/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('resultsController', function (omdbApi, $location) {

        var resultsCtrl = this;

        var query = $location.search().q;

        var errorHandler = function () {
            resultsCtrl.errorMessage = "ERROR: something went wrong";
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
                    resultsCtrl.results = [{ noHits: "No matches" }];
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