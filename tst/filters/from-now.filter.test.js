/// <reference path="../../typings/index.d.ts" />

describe("from-now filter test", function(){

    var fromNow;

    beforeEach(module('movie-app'));

    beforeEach(inject(function (_$filter_) {
        fromNow = _$filter_('fromNowFilter');
    }));

    it("should return an error for undefined", function(){
        expect(fromNow).toThrow("date value can not be undefined");
    });

});