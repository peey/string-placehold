var _ = require("lodash");

var stringValueJoin = function (strings, values) {
  return _.compact(_.flatten(_.zip(strings, values))).join("");
};

var mapTokensToValues = function (tokens, map) {
  var values = [];
  _.each(tokens, function(token, index) {
    values[index] = map[token];
  });
  return values;
};

var Placeholder = function (strings, tokens) {
  this.strings = strings;
  this.tokens = tokens;
};

Placeholder.prototype.fill = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  var map = (_.isObject(args[0]) || _.isArray(args[0]))? args[0] : args;
  var values = mapTokensToValues(this.tokens, map);
  return stringValueJoin(this.strings, values);
};

var placeholdClosure = function (strings, tokens) {
  var placeholder = new Placeholder(strings, tokens);
  return function () {
    return placeholder.fill.apply(placeholder, arguments);
  };
}

/*
 * @example
 * 
 * var template = placehold `My ${"future"} template`
 * 
 * var result = template({future: "lovely"}); 
 * //result -> "My lovely template"
 * 
 * @example
 * 
 * var interpolate = placehold `My ${0} and ${1} template`
 * var result = interpolate("lovely", "neat");
 * //or
 * var result = interpolate(["lovely", "neat"]);
 * //result -> "My lovely and neat template"
 */
var placehold = module.exports = function (strings) {
  var values = Array.prototype.slice.call(arguments, 1);
  var tokens = values;
  return placeholdClosure(strings, tokens);
};