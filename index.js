var _ = require("lodash");

//what you would call a 'template'
var Placeholded = function (strings, tokens) {
  this.strings = strings;
  this.tokens = _.map(tokens, String);
};

Placeholded.prototype.stringValueJoin = function (values) {
  //works as the _.zip correctly orders the values in front of their respective strings,
  //then flatten falattens it out so now we have a big array of thing in order, ready to be joined.
  //Compact is required because of unequal length of strings and values, zipping introduces some undefineds in the array.
  return _.compact(_.flatten(_.zip(this.strings, values))).join("");
};

//considers the array as an object with number keys to achieve the mapping. So it unintentionally will convert a ${"length"} placeholder to length of the array.
Placeholded.prototype.mapTokensToValues = function (map) {
  var values = [];
  _.each(this.tokens, function(token, index) {
    values[index] = map[token];
  });
  return values;
};

Placeholded.prototype.interpolate = function (values) {
  var map = (_.isObject(values[0]) || _.isArray(values[0]))? values[0] : values;
  
  var diff = _.difference(_.unique(this.tokens), _.keys(map));
  if(!_.isEmpty(diff)) {
    throw new Error(`string-placehold: value-token mismatch. No values provided for ${diff.length} placeholders. offending tokens : ${diff.join(", ")}`);
  }

  var valuesInOrder = this.mapTokensToValues(map);
  return this.stringValueJoin(valuesInOrder);
};

var placeholderClosure = function (strings, tokens) {
  var placeholded = new Placeholded(strings, tokens);
  return function () {
    var args = Array.prototype.slice.call(arguments, 0);
    return placeholded.interpolate(args);
  };
}

var placehold = function (strings) {
  var values = Array.prototype.slice.call(arguments, 1);
  var tokens = values;
  return placeholderClosure(strings, tokens);
};

module.exports = placehold;