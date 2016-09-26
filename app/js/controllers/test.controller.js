/// <reference path="../../../typings/index.d.ts" />

angular
    .module('movie-app')
    .controller('testController', function (omdbApi) {
        var vm = this;

        omdbApi.search('star wars')
            .then(function(data){
                console.log(data);
            })
            .catch(function(){
                console.error("ERROR: search movie");
            });
    });
