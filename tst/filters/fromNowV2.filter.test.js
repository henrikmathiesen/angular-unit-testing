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


    // ============================================================================================================================================================================================================

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

    // This test passes (date is not moved) when not converting to UTC time, since we provide +01:00 which is the correct swedish UTC offset at winter time (2007-01 is winter time), sweden is 1 hour ahead of GMT
    it("should handle give correct from year ago -- I", function () {
        var released = "2007-01-01T00:00:00+01:00";
        var comparedTo = "2016-12-31T23:00:00+01:00";

        expect(fromNow(released, comparedTo)).toBe("9 years ago");
    });

    // ============================================================================================================================================================================================================

    //
    // These tests FAILS when converting to UTC since they are created as local date and converted to UTC (and dates are being moved back 1-2 hours, depending on if it was summer/winter time at the time)
    // These tests PASS when NOT converting to UTC since they are then created as local dates, with correct time zone info(?) (dates are not being moved)

    it("should return value of years ago for date close to a new year -- A", function () {
        var released = "31 Dec 2006";
        var comparedTo = "1 Jan 2016";
        expect(fromNow(released, comparedTo)).toBe("10 years ago");
    });

    it("should return value of years ago for date close to a new year -- B", function () {
        var released = "1 Jan 2006";
        var comparedTo = "31 Dec 2016";
        expect(fromNow(released, comparedTo)).toBe("10 years ago");
    });

    it("should return value of 1 year ago singular form", function () {
        var released = "05 May 2015";
        var comparedTo = "1 Jan 2016";
        expect(fromNow(released, comparedTo)).toBe("1 year ago");
    });


    //
    // #################################################################################################################################################################################################################
    //
    // The above tests works on a machine in sweden executing the code
    // There could however be problems on a machine in another country that has a different time zone
    // For example "2016-12-31T23:00:00+01:00" could be moved forward to 2017 in a country several hours ahead of UTC
    // Iam not 100% sure about this, when using ISO format

    it("should use teachers example", function () {
        var currentDate = new Date('2014-12-31T23:00:00Z'); // adding +01:00 will make isNewYear false, because it is then specified as a date 1 hour ahead of UTC, so it is NOT pushed forward
        var newYear = 2015;
        var isNewYear = currentDate.getFullYear() == newYear;

        expect(isNewYear).toBe(true);

        // This date is moved forward here in sweden, since we are ahead of UTC, making the test true
        // The date currentDate is actualy 2015 in sweden, local time
        // This behavior makes sense
        // Also, just calling new Date(); creates a local time that would be +1 or +2 (depening on winter/summer time) ahead of UTC

    });

    // Passing 0 means that local time is the same as UTC time
    // Teacher is not providing +hh:mm in the date string, he is using Z all the time

    it("should use angulars tz date, so dates are not moved based on local time zone -- A", function(){
        var currentDate = angular.mock.TzDate(0, '2014-12-31T23:00:00Z');
        var newYear = 2015;
        var isNewYear = currentDate.getFullYear() == newYear;

        expect(isNewYear).toBe(false);
    });

    it("should use angulars tz date, so dates are not moved based on local time zone -- C", function(){
        var currentDate = angular.mock.TzDate(0, '2015-01-01T00:00:00Z');
        var newYear = 2015;
        var isNewYear = currentDate.getFullYear() == newYear;

        expect(isNewYear).toBe(true);
    });

});