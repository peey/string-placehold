var assert = require("assert");
var placehold = require(".././index.js");

describe("string-placeholder", function () {
  describe("placehold tag", function () {
    
    it("should return a function", function () {
      var template = placehold `hi`;
      assert.equal(typeof template, "function");
    });
    
    it("should interpolate for named placeholders", function () {
      var template = placehold `this is ${"adjective"}`;
      assert.equal(template({adjective: "nice"}), "this is nice");
    });
    
    it("should interpolate same template with different values in different interpolations", function () {
      var template = placehold `this is ${0} and ${1}`;
      assert.equal(template("nice", "cozy"), "this is nice and cozy");
      assert.equal(template("nicer", "cozier"), "this is nicer and cozier");
    });
    
    it("should interpolate for numbered placeholders", function () {
      var template = placehold `this is ${0} and ${1}`;
      assert.equal(template("nice", "cozy"), "this is nice and cozy");
    });
    
    it("should interpolate for numbered placeholders and accept an array of values", function () {
      var template = placehold `this is ${0} and ${1}`;
      assert.equal(template(["nice", "cozy"]), "this is nice and cozy");
    });
    
    it("should throw when provided values are less than provided unique tokens", function () {
      var template = placehold `this is ${0} and ${1}`;
      assert.throws(function () {
        template("nice");
      }, /string-placehold: no values provided for/);
    });
    
    it("shouldn't throw when provided values are more than provided unique tokens", function () {
      var template = placehold `this is ${0} and ${1}`;
      assert.doesNotThrow(function () {
        template("nice", "cozy", "fuzzy");
      }, /string-placehold: value-token mismatch/);
    });
    
    it("should interpolate for duplicate placeholders", function () {
      var template = placehold `this is ${0} and ${0}`;
      assert.equal(template(["nice", "cozy"]), "this is nice and nice");
    });
    
  });
});