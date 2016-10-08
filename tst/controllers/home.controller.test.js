/// <reference path="../../typings/index.d.ts" />

describe("home controller test", function () {

    var results = [
        {
            Title: "Star Wars: Episode IV - A New Hope",
            Year: "1977",
            imdbID: "tt0076759",
            Type: "movie"
        },
        {
            Title: "Star Wars: Episode V - The Empire Strikes Back",
            Year: "1980",
            imdbID: "tt0080684",
            Type: "movie"
        },
        {
            Title: "Star Wars: Episode VI - Return of the Jedi",
            Year: "1983",
            imdbID: "tt0086190",
            Type: "movie"
        }
    ];

    var $controller;
    var homeCtrl;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;

        homeCtrl = $controller('homeController');
    }));

    

});