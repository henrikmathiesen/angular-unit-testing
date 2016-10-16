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
        var comparedTo = "25 May 2016";
        expect(fromNow(released, comparedTo)).toBe("30 years ago");
    });

    it("should return value of years ago for date close to a new year", function () {
        var released = "31 Dec 2006";
        var comparedTo = "1 Jan 2016";
        expect(fromNow(released, comparedTo)).toBe("10 years ago");
    });

    it("should return value of 1 year ago singular form", function () {
        var released = "05 May 2015";
        var comparedTo = "1 Jan 2016";
        expect(fromNow(released, comparedTo)).toBe("1 year ago");
    });

    it("should handle possible time zone offsets (ISO string)", function () {
        var released = "2006-12-31T23:00:00";
        var comparedTo = "1 Jan 2016";

        expect(fromNow(released, comparedTo)).toBe("10 years ago");

        // Without special logic in the filter, 'released' would be converted to swedish time,
        // which is 1-2 hours (depending on winter/summer time) ahead of UTC time
        // That would have moved the year into 2007 and the test would fail: expected 9 to be 10

        // But the logic in the filter removes the timeZone offset, "stamping" released to be a local date
    });
});