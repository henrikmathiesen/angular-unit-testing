/// <reference path="../../typings/index.d.ts" />

describe("movie-result directive test", function () {

    var resultMock = {
        Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTcwOTk@._V1_SX300.jpg",
        Title: "Star Wars: Episode IV - A New Hope",
        Director: "George Lucas",
        Actors: "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
        Released: "25 May 1997",
        Genre: "Action, Adventure, Fantasy"
    };

    var $compile;
    var $rootScope;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it("should output movie result to expected HTML format", function () {
        var element;
        $rootScope.result = resultMock;
        element = $compile('<movie-result result="result"></movie-result>')($rootScope); // This returns an jqLite element
        $rootScope.$digest();

        // See the actual directive element
        //console.log(element[0].outerHTML);

        // Since the div is replacing the wrapper directive element, this is the result of element.html()
        expect(element.html()).toBe("Star Wars: Episode IV - A New Hope");
    });

});