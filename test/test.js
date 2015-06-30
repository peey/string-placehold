var assert = require("assert");
var placehold = require(".././index.js");

describe("string-placeholder", function () {
  describe("placehold tag", function () {
    
    it("should return a function", function () {
      var template = placehold `hi`;
      assert.equal(typeof template, "function");
    });
    
    it("should interpolate for named paramenters", function () {
      var interpolate = placehold `this is ${"adjective"}`;
      assert.equal(interpolate({adjective: "nice"}), "this is nice");
    });
    
    it("should interpolate for numbered parameters", function () {
      var interpolate = placehold `this is ${0} and ${1}`;
      assert.equal(interpolate("nice", "cozy"), "this is nice and cozy");
    });
    
    it("should interpolate for numbered parameters and accept an array of values", function () {
      var interpolate = placehold `this is ${0} and ${1}`;
      assert.equal(interpolate(["nice", "cozy"]), "this is nice and cozy");
    });
    
    it("should interpolate for duplicate parameters", function () {
      var interpolate = placehold `this is ${0} and ${0}`;
      assert.equal(interpolate(["nice", "cozy"]), "this is nice and nice");
    });
  });
});