/// <reference path="../../typings/index.d.ts" />

describe("from-now filter test", function () {

    var fromNow;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$filter_) {
        fromNow = _$filter_('fromNowFilter');
    }));

    it("should return an error for undefined", function () {
        expect(fromNow()).toBe("ERROR: value must be date object");
    });

    it("should return an error for invalid date", function(){
        expect(fromNow('foo')).toBe("ERROR: value must be date object");
    });

    // it("should return value of years ago for date object", function(){

    // });

});