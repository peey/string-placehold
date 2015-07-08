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
      }, /string-placehold: value-token mismatch/);
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
  
  describe("curry", function () {
    
    it("should be a function", function () {
      var template = placehold `hi`;
      var curry = template.curry();
      assert.equal(typeof curry, "function");
    });
    
    it("should return a function while values are still incompletely provided", function () {
      var template = placehold `this is ${0} and ${1}`;
      var curry = template.curry()({0: "nice"});
      
      assert.equal(typeof curry, "function");
    });
    
    it("should interpolate when all tokens have been provided for", function () {
      var template = placehold `this is ${0} and ${1}`;
      var result = template.curry()({0: "nice"})({1: "cozy"});
      
      assert.equal(result, "this is nice and cozy");
    });
    
    it("should be immutable and hence reusable", function () {
      var template = placehold `this is ${0} and ${1} and ${2}`;
      var nice = template.curry()({0: "nice"});
      var good = nice({2: "good"});
      var bad = nice({2: "bad"});
      
      assert.equal(good({1: "cozy"}), "this is nice and cozy and good");
      assert.equal(bad({1: "cozy"}), "this is nice and cozy and bad");
    });
    
    it("should interpolate with named tokens", function () {
      var template = placehold `this is ${"adjective"} and ${"otherAdjective"}`;
      var result = template.curry()({adjective: "nice"})({otherAdjective: "cozy"});
      
      assert.equal(result, "this is nice and cozy");
    });
    
    it("should accept values in any order", function () {
      var template = placehold `this is ${0} and ${1}`;
      var result = template.curry()({1: "cozy"})({0: "nice"});
      
      assert.equal(result, "this is nice and cozy");
    });
    
    it("should accept sequential input", function () {
      var template = placehold `this is ${0} and ${1}`;
      var result = template.curry()("nice")("cozy");
      
      assert.equal(result, "this is nice and cozy");
    });
    
  });
});