/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('resultsController', function (omdbApi) {

        var resultsCtrl = this;

        omdbApi.search('star wars')
            .then(function (response) {
                if (!response.data.Error) {
                    resultsCtrl.results = response.data.Search;
                }
                else {
                    console.log("no hits");
                }
            })
            .catch(function () {
                console.error("ERROR: search movie");
            });

    });