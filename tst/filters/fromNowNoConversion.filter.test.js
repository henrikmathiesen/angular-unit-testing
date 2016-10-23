/// <reference path="../../typings/index.d.ts" />

describe("from-now no conversion filter test", function () {

    var fromNow;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$filter_) {
        fromNow = _$filter_('fromNowFilterNoConversion');
    }));

    it("should return an empty string if no value", function () {
        expect(fromNow()).toBe("");
    });

});