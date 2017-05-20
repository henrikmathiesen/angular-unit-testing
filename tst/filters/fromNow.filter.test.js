/// <reference path="../../typings/index.d.ts" />

fdescribe("from-now filter test", function () {

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

    it("can fail if not given an UTC time", function () { 
        var released = "2015-05-05T00:00:00+02:00";
        var comparedTo = "2016-01-01T00:00:00+02:00";
        expect(fromNow(released, comparedTo)).not.toBe("1 year ago");
    });
});
