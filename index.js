var _ = require("lodash");
var Placeholded = require("./placeholded.class.js");
var Curry = require("./curry.class.js");

var closure = function (placeholded) {
  var result = _.callback(placeholded.interpolate, placeholded);
  
  result.curry = function () {
    var curry =  new Curry(placeholded);
    return curry.interpolateClosure();
  };
  
  return result;
};

var placehold = function (strings) {
  var values = Array.prototype.slice.call(arguments, 1);
  var tokens = values;
  var placeholded = new Placeholded(strings, tokens);
  return closure(placeholded);
};

module.exports = placehold;