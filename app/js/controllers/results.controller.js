/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('resultsController', function (omdbApi, $location) {

        var resultsCtrl = this;

        var query = $location.search().q;

        var errorHandler = function () {
            resultsCtrl.errorMessage = "ERROR: something went wrong";
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

        resultsCtrl.toggleAccordian = function (isOpen, id, index) {
            if (isOpen) {
                omdbApi.find(id)
                    .then(function (response) {
                        resultsCtrl.results[index].movieDetails = response.data;
                    })
                    .catch(errorHandler);
            }
        };

    });