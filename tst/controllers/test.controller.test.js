/// <reference path="../../typings/index.d.ts" />

describe("test controller test", function () {

    var $scope;
    var $compile;
    var element;
    var jQelement;
    var testCtrl;
    var html;
    var omdbApi;
    var omdbApiMock;
    var $q;

    beforeEach(module('movie-app'));

    beforeEach(inject(function ($controller, $rootScope, _$compile_, _omdbApi_, _$q_) {
        $scope = $rootScope.$new();
        $compile = _$compile_;
        omdbApi = _omdbApi_;
        $q = _$q_;

        spyOn(omdbApi, 'search').and.callFake(function () {
            // We cant do this since factory do not actually resolve the promise (and we dont call success in controller)
            // var deferred = $q.defer();
            // deferred.resolve("ajax call resolved");
            // return deferred.promise;

            // The promise is resolved in the controller, so we return just the promise from here
            return $q.defer().promise;
        });

        testCtrl = $controller('testController', { omdbApi: omdbApi });
    }));

    it("should render property", function () {
        expect(testCtrl.foo).toBe("Bar");
    });

});