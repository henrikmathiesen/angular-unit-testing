/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('testController', function (omdbApi) {
        var testCtrl = this;

        var getMoreInfoOnFirstHit = function (id) {
            omdbApi.find(id)
                .then(function(response){
                    console.log(response);
                })
                .catch(function(){
                    console.error("ERROR: find movie");
                });
        }

        omdbApi.search('star wars')
            .then(function (response) {
                if(!response.data.Error) {
                    getMoreInfoOnFirstHit(response.data.Search[0].imdbID);
                }
                else {
                    console.log("no hits");
                }
            })
            .catch(function () {
                console.error("ERROR: search movie");
            });
    });
