/// <reference path="../../typings/index.d.ts" />

describe("from-now no conversion filter test", function () {

    var fromNow;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$filter_) {
        fromNow = _$filter_('fromNowFilterV2');
    }));

    it("should return an empty string if no value", function () {
        expect(fromNow()).toBe("");
    });

    it("should handle give correct from year ago if a time zone is provided -- A", function () {
        var released = "2006-12-31T23:00:00+02:00";
        var comparedTo = "2016-12-31T23:00:00+02:00";

        expect(fromNow(released, comparedTo)).toBe("10 years ago");
    });

    it("should handle give correct from year ago if a time zone is provided -- B", function () {
        var released = "2006-12-31T23:00:00+02:00";
        var comparedTo = "2016-12-24T23:00:00+02:00";

        expect(fromNow(released, comparedTo)).toBe("10 years ago");
    });

    it("should NOT handle give correct from year ago if a time zone is NOT provided -- A", function () {
        var released = "2006-12-31T23:00:00";
        var comparedTo = "2016-12-24T23:00:00+02:00";

        expect(fromNow(released, comparedTo)).toBe("10 years ago");
    });

});