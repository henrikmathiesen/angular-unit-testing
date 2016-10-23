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

    // it("should handle give correct from year ago -- A", function () {
    //     var released = "2006-12-31T23:00:00+02:00";
    //     var comparedTo = "2016-12-31T23:00:00+02:00";

    //     expect(fromNow(released, comparedTo)).toBe("10 years ago");
    // });

    // This test failes when filter does not convert to UTC time, because the time at release time was GMT+01:00
    // it("should handle give correct from year ago -- B", function () {
    //     var released = "2007-01-01T00:00:00+02:00";
    //     var comparedTo = "2016-12-24T23:00:00+02:00";

    //     expect(fromNow(released, comparedTo)).toBe("9 years ago");
    // });

    // This test fails when filter does not convert to UTC time, since specified UTC time 2006-12-31 is pushed forward to swedish summer time 2007
    // it("should handle give correct from year ago -- C", function () {
    //     var released = "2006-12-31T23:00:00";
    //     var comparedTo = "2016-12-24T23:00:00+02:00";

    //     expect(fromNow(released, comparedTo)).toBe("10 years ago");
    // });

    // Same as C
    // it("should handle give correct from year ago -- E", function () {
    //     var released = "2006-12-31T23:00:00";
    //     var comparedTo = "2016-12-24T23:00:00";

    //     expect(fromNow(released, comparedTo)).toBe("10 years ago");
    // });

    // This test fails when filter converts to UTC time, since 2007-01-01 is pushed back to 2006
    // it("should handle give correct from year ago -- G", function () {
    //     var released = "2007-01-01T00:00:00+02:00";
    //     var comparedTo = "2016-12-01T23:00:00+02:00";

    //     expect(fromNow(released, comparedTo)).toBe("9 years ago");
    // });


    //
    // SUCCESS WHEN CONVERTING TO UTC -- expect it to be converted in the test

    // This test passes when converting to UTC time in filter, since we are expecting it to be pushed back 1 hour to UTC time, pushing it to 2006
    // it("should handle give correct from year ago -- H", function () {
    //     var released = "2007-01-01T00:00:00+01:00";
    //     var comparedTo = "2016-12-01T23:00:00+01:00";

    //     expect(fromNow(released, comparedTo)).toBe("10 years ago");
    // });

    //
    // SUCCESS WHEN NOT CONVERTING TO UTC -- expect it to NOT be converted in the test -- OBS: SUPPLY THE CORRECT TIME ZONE INFO

    // This test passes when not converting to UTC time, since we procide +01:00 which is the correct swedish UTC offset at winter time (2007-01 is winter time)
    it("should handle give correct from year ago -- I", function () {
        var released = "2007-01-01T00:00:00+01:00";
        var comparedTo = "2016-12-01T23:00:00+01:00";

        expect(fromNow(released, comparedTo)).toBe("9 years ago");
    });

});