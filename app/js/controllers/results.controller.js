/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('resultsController', function (omdbApi, $location) {

        var resultsCtrl = this;

        var query = $location.search().q;

        omdbApi.search(query)
            .then(function (response) {
                if (!response.data.Error) {
                    resultsCtrl.results = response.data.Search;
                }
                else {
                    resultsCtrl.results = [ { noHits: "No matches" } ];
                }
            })
            .catch(function () {
                resultsCtrl.errorMessage = "ERROR: something went wrong";
            });

    });