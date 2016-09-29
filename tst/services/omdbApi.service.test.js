/// <reference path="../../typings/index.d.ts" />

describe("omdb service", function () {

    // http://www.omdbapi.com/?s=star+wars&y=&plot=short&r=json

    var movieData = { "Search": [{ "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "imdbID": "tt0076759", "Type": "movie", "Poster": "http://ia.media-imdb.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTcwOTk@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode V - The Empire Strikes Back", "Year": "1980", "imdbID": "tt0080684", "Type": "movie", "Poster": "http://ia.media-imdb.com/images/M/MV5BMjE2MzQwMTgxN15BMl5BanBnXkFtZTcwMDQzNjk2OQ@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode VI - Return of the Jedi", "Year": "1983", "imdbID": "tt0086190", "Type": "movie", "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ0MzI1NjYwOF5BMl5BanBnXkFtZTgwODU3NDU2MTE@._V1._CR93,97,1209,1861_SX89_AL_.jpg_V1_SX300.jpg" }, { "Title": "Star Wars: The Force Awakens", "Year": "2015", "imdbID": "tt2488496", "Type": "movie", "Poster": "http://ia.media-imdb.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode I - The Phantom Menace", "Year": "1999", "imdbID": "tt0120915", "Type": "movie", "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ4NjEwNDA2Nl5BMl5BanBnXkFtZTcwNDUyNDQzNw@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode III - Revenge of the Sith", "Year": "2005", "imdbID": "tt0121766", "Type": "movie", "Poster": "http://ia.media-imdb.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg" }, { "Title": "Star Wars: Episode II - Attack of the Clones", "Year": "2002", "imdbID": "tt0121765", "Type": "movie", "Poster": "N/A" }, { "Title": "Star Wars: The Clone Wars", "Year": "2008", "imdbID": "tt1185834", "Type": "movie", "Poster": "N/A" }, { "Title": "Star Wars: The Clone Wars", "Year": "2008–2015", "imdbID": "tt0458290", "Type": "series", "Poster": "http://ia.media-imdb.com/images/M/MV5BMTM0NjQ2Mjk0OV5BMl5BanBnXkFtZTcwODQ3Njc3Mg@@._V1_SX300.jpg" }, { "Title": "Star Wars: Clone Wars", "Year": "2003–2005", "imdbID": "tt0361243", "Type": "series", "Poster": "http://ia.media-imdb.com/images/M/MV5BMjE2Mjk5Mzk3M15BMl5BanBnXkFtZTcwMDkzMTIzMQ@@._V1_SX300.jpg" }], "totalResults": "350", "Response": "True" };

    var movieDataById = { "Title": "Star Wars: Episode IV - A New Hope", "Year": "1977", "Rated": "PG", "Released": "25 May 1977", "Runtime": "121 min", "Genre": "Action, Adventure, Fantasy", "Director": "George Lucas", "Writer": "George Lucas", "Actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing", "Plot": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader.", "Language": "English", "Country": "USA", "Awards": "Won 6 Oscars. Another 48 wins & 28 nominations.", "Poster": "http://ia.media-imdb.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTcwOTk@._V1_SX300.jpg", "Metascore": "92", "imdbRating": "8.7", "imdbVotes": "915,459", "imdbID": "tt0076759", "Type": "movie", "Response": "True" };

    var omdbApi = {};
    var $httpBackend;

    beforeEach(function () {
        module('movie-app');

        // Our factory is extracted to a live service, we inject it (angular.mock.inject -- module and inject are so common that they are put in global scope)
        inject(function (_omdbApi_, _$httpBackend_) {
            omdbApi = _omdbApi_;
            $httpBackend = _$httpBackend_;
        });

        $httpBackend.when('GET', 'http://www.omdbapi.com/?s=star+wars')
            .respond(200, { data: movieData });

        $httpBackend.when('GET', 'http://www.omdbapi.com/?i=tt0076759&plot=full')
            .respond(200, { data: movieDataById });
    });

    it("should return search movie data", function () {

        // mock a module with a value service (important, can not inject other services into this value service)
        // angular.mock.module({
        //     'omdbApi': {
        //         search: function (query) {
        //             return movieData; // movied to live service
        //         }
        //     }
        // });

        // mock a module with a factory service (more flexible)
        // angular.mock.module(function($provide){
        //     $provide.factory('omdbApi', function(){
        //         var factory = {};
        //         factory.search = function(query){
        //             return movieData;
        //         }
        //         return factory;
        //     });
        // });

        //expect(omdbApi.search('star wars')).toEqual(movieData);

        omdbApi.search('star wars')
            .then(function (response) {
                expect(response.data).toEqual(movieData);
            });

    });

    it("should return movie data by id", function () {

        //expect(omdbApi.find('tt0076759')).toEqual(movieDataById);

        // angular.mock.dump gives more nicely formated json object in console
        //console.log(angular.mock.dump(movieDataById));

        omdbApi.find('tt0076759')
            .then(function (response) {
                expect(response.data).toEqual(movieDataById);
            });
    });

    it("should handle error", function () {
        $httpBackend.when('GET', 'http://www.omdbapi.com/?i=tt0076759&plot=full')
            .respond(500, 'Error');

        omdbApi.find('tt0076759')
            .then(function (response) {})
            .catch(function (response) {
                expect(response).toEqual('Error');
            })
    });
});