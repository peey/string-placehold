var _ = require("lodash");

var stringValueJoin = function (strings, values) {
  //works as the _.zip correctly orders the values in front of their respective strings,
  //then flatten falattens it out so now we have a big array of thing in order, ready to be joined.
  //Compact is required because of unequal length of strings and values, zipping introduces some undefineds in the array.
  return _.compact(_.flatten(_.zip(strings, values))).join("");
};

//considers the array as an object with number keys to achieve the mapping. So it unintentionally will convert a ${"length"} placeholder to length of the array.
var mapTokensToValues = function (tokens, map) {
  var values = [];
  _.each(tokens, function(token, index) {
    values[index] = map[token];
  });
  return values;
};

var interpolate = function (strings, tokens, values) {
  var map = (_.isObject(values[0]) || _.isArray(values[0]))? values[0] : values;
  var valuesInOrder = mapTokensToValues(tokens, map);
  return stringValueJoin(strings, valuesInOrder);
};

var placeholderClosure = function (strings, tokens) {
  return function () {
    var args = Array.prototype.slice.call(arguments, 0);
    return interpolate(strings, tokens, args);
  };
}

var placehold = module.exports = function (strings) {
  var values = Array.prototype.slice.call(arguments, 1);
  var tokens = values;
  return placeholderClosure(strings, tokens);
};