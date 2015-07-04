var _ = require("lodash");
var Placeholded = require("./placeholded.class.js");

var placeholderClosure = function (strings, tokens) {
  var placeholded = new Placeholded(strings, tokens);
  return function () {
    return placeholded.interpolate.apply(placeholded, arguments);
  };
};

var placehold = function (strings) {
  var values = Array.prototype.slice.call(arguments, 1);
  var tokens = values;
  return placeholderClosure(strings, tokens);
};

module.exports = placehold;