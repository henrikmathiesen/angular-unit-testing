/// <reference path="../../typings/index.d.ts" />

describe("search controller test", function () {

    var $location;
    var $controller;
    var searchCtrl;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$controller_, _$location_) {
        $location = _$location_;
        $controller = _$controller_;

        searchCtrl = $controller('searchController', { $location: $location });             // A) can set bindings here , { query: '...' }

    }));

    it("should redirect to the search result page for a non empty query", function () {
        searchCtrl.query = 'star wars';                                                     // B) instead of here, if we wish
        searchCtrl.search();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

    it("should not redirect if query is empty", function () {
        searchCtrl.query = '';
        searchCtrl.search();
        expect($location.url()).toBe('');
    });

    it("should redirect after 1 second of keyboard inactivity", function(){
        searchCtrl.query = 'star wars';
        searchCtrl.keyup();
        expect($location.url()).toBe('/results?q=star%20wars');
    });

});