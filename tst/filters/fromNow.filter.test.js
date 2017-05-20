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

    it("expects to be given an UTC time", function () {
        var released = "2015-05-05T00:00:00+00:00";
        var comparedTo = "2016-01-01T00:00:00+00:00";
        expect(fromNow(released, comparedTo)).toBe("1 year ago");
    });

    it("can fail if not given an UTC time, since date will be converted to UTC time", function () {
        var released = "2015-05-05T00:00:00+02:00";
        var comparedTo = "2016-01-01T00:00:00+01:00";
        expect(fromNow(released, comparedTo)).not.toBe("1 year ago");
    });
});

describe("from-now filter v2 test, comparison", function () {
    var fromNow;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$filter_) {
        fromNow = _$filter_('fromNowFilterV2');
    }));

    it("should return an empty string if no value", function () {
        expect(fromNow()).toBe("");
    });

    it("expects to be given a local time", function () {
        var released = "2015-05-05T00:00:00+02:00";
        var comparedTo = "2016-01-01T00:00:00+01:00";
        expect(fromNow(released, comparedTo)).toBe("1 year ago");
    });

    it("can fail if not given an local time, since date will be converted to local time", function () {
        var released = "2015-12-31T23:00:00+00:00";
        var comparedTo = "2016-01-01T00:00:00+00:00";
        expect(fromNow(released, comparedTo)).not.toBe("1 year ago");
    });
});
