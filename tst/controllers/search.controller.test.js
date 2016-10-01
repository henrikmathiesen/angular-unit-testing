/// <reference path="../../typings/index.d.ts" />

describe("search controller test", function () {

    var $location;
    var $controller;
    var searchCtrl;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$controller_, _$location_) {
        $location = _$location_;
        $controller = _$controller_;

        searchCtrl = $controller('searchController', { $location: $location });

    }));

    it("should redirect to the search result page for a non empty query", function () {
        searchCtrl.query = 'star wars';
        searchCtrl.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it("should not redirect if query is empty", function () {
        searchCtrl.query = '';
        searchCtrl.search();
        expect($location.url()).toBe('');
    });

});