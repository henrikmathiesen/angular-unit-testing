/// <reference path="../../typings/index.d.ts" />

describe("from-now filter test", function () {

    var fromNow;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$filter_) {
        fromNow = _$filter_('fromNowFilter');
    }));

    it("should return an empty string if no value", function () {
        expect(fromNow()).toBe("");
    });

    it("should return value of years ago for date", function () {
        var released = "25 May 1986";
        expect(fromNow(released)).toBe("30 years ago");
    });

    it("should return value of years ago for date close to a new year", function () {
        var released = "31 Dec 2006";
        expect(fromNow(released)).toBe("10 years ago");
    });

    it("should return value of 1 year ago for date of one year before (it should also handle date objects as value)", function () {
        var now = new Date();
        var oneYearAgo = now.getTime() - (60 * 60 * 24 * 365 * 1000); // when substracting time (like 1 year, do it in ms, else constructor undefined error)
        var released = new Date(oneYearAgo);

        expect(fromNow(released)).toBe("1 year ago");
    });

    it("should handle possible time zone offsets", function () {
        var released = "2006-12-31T23:00:00";
        expect(fromNow(released)).toBe("10 years ago");
    });

    it("should handle dates as ISO strings - 2", function () {
        var released = "2006-12-31T23:00:00.545Z";
        expect(fromNow(released)).toBe("10 years ago");
    });

});