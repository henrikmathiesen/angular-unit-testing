/// <reference path="../../typings/index.d.ts" />

describe("movie-result directive test", function () {

    var result = {
        Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTcwOTk@._V1_SX300.jpg",
        Title: "Star Wars: Episode IV - A New Hope",
        Director: "George Lucas",
        Actors: "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
        Released: "25 May 1997",
        Genre: "Action, Adventure, Fantasy"
    };

    var $compile;
    var $scope;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
    }));

    it("should output movie result to expected HTML format", function () {
        var html;
        html = $compile('<movie-result></movie-result>')($scope).html();
        expect(html).toBe('<div>Star Wars: Episode IV - A New Hope</div>');
    });

});