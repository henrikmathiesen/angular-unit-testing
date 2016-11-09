/// <reference path="../../typings/index.d.ts" />

describe("movie-result directive test", function () {

    var resultMock = {
        Poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BOTIyMDY2NGQtOGJjNi00OTk4LWFhMDgtYmE3M2NiYzM0YTVmXkEyXkFqcGdeQXVyNTU1NTcwOTk@._V1_SX300.jpg",
        Title: "Star Wars: Episode IV - A New Hope",
        Director: "George Lucas",
        Actors: "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
        Released: "25 May 1997",
        Genre: "Action, Adventure, Fantasy",
        Plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a wookiee and two droids to save the galaxy from the Empire's world-destroying battle-station, while also attempting to rescue Princess Leia from the evil Darth Vader."
    };

    var $compile;
    var $rootScope;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it("should output movie result to expected HTML format", function () {
        $rootScope.result = resultMock;
        var $element = $compile('<movie-result result="result"></movie-result>')($rootScope); // This returns an jqLite $element / jquery $element
        $rootScope.$digest();

        // See the actual directive $element
        //console.log($element[0].outerHTML);

        // Since the div is replacing the wrapper directive $element, this is the result of $element.html()
        // when template was <div>{{ result.Title }}</div>
        // expect($element.html()).toBe("Star Wars: Episode IV - A New Hope");

        expect($element.find('.col-sm-4').length).toBe(1, "There should be one left column");
        expect($element.find('.col-sm-8').length).toBe(1, "There should be one right column");

        expect($element.find('.col-sm-4 img').attr('src')).toBe(resultMock.Poster);
        expect($element.find('.col-sm-4 img').attr('alt')).toBe(resultMock.Title);

        expect($element.find('.col-sm-8 h3').text()).toBe(resultMock.Title);

        expect($element.find('.col-sm-8 p').eq(0).text()).toContain(resultMock.Director);
        expect($element.find('.col-sm-8 p').eq(1).text()).toContain(resultMock.Actors);
        expect($element.find('.col-sm-8 p').eq(2).text()).toContain(resultMock.Released);
        expect($element.find('.col-sm-8 p').eq(3).text()).toContain(resultMock.Genre);
        expect($element.find('.col-sm-8 p').eq(4).text()).toContain(resultMock.Plot);

        // utilities for checking scopes and performance, can also use these on $scope
        console.log("==========================================");
        console.log("Child scopes: " + $rootScope.$countChildScopes());
        console.log("Watchers: " + $rootScope.$countWatchers());
        console.log("==========================================");
    });

    it("should know how to brute force the scope properties", function () {
        $rootScope.result = resultMock;
        var $element = $compile('<movie-result result="result"></movie-result>')($rootScope);
        $rootScope.$digest();

        expect($element.find('.col-sm-8 h3').text()).toBe("Star Wars: Episode IV - A New Hope", "The Title set from mocked data");

        var isolateScope = $element.isolateScope();
        isolateScope.result.Title = "A New Title";
        $rootScope.$apply();

        expect($element.find('.col-sm-8 h3').text()).toBe("A New Title", "The Title brute forced in later in the test");
    });

});