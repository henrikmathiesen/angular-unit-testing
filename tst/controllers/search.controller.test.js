/// <reference path="../../typings/index.d.ts" />

describe("search controller test", function () {

    var $location;
    var $controller;
    var searchCtrl;
    var $timeout;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$controller_, _$location_, _$timeout_) {
        $location = _$location_;
        $controller = _$controller_;
        $timeout = _$timeout_;

        searchCtrl = $controller('searchController', { $location: $location, $timeout: $timeout });     // A) can set bindings here , { query: '...' }

    }));

    it("should redirect to the search result page for a non empty query", function () {
        searchCtrl.query = 'star wars';                                                                 // B) instead of here, if we wish
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
        $timeout.flush(1000);               // can set 1000 (like in the controller), to flush only that timeout, or no argument to flush all
        $timeout.verifyNoPendingTasks();    // This lines gives a good error message if not flushed all timeouts
        expect($location.url()).toBe('/results?q=star%20wars');
    });

});