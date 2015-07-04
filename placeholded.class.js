var _ = require("lodash");

var arrayToObject = function (arr) {
  return _.transform(arr, function (result, value, key) {
      result[key] = value;
    }, {});
};

//what you would call a 'template'
var Placeholded = function (strings, tokens, curried) {
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


Placeholded.prototype.unprovidedTokens = function (map) {
  var diff = _.difference(_.unique(this.tokens), _.keys(map));
  return _.isEmpty(diff)? false : diff;
};

//returns a map object
Placeholded.prototype.parseInterpolateArguments = function () {
  var args = Array.prototype.slice.call(arguments);
  
  if(_.isArray(args[0])) {
    //from array
    return arrayToObject(args[0]);
  } else if(_.isObject(args[0])) {
    //already may object
    return args[0];
  } else {
    //from list of arguments
    return arrayToObject(args);
  }
};

Placeholded.prototype.interpolate = function () {
  var map = this.parseInterpolateArguments.apply(this, arguments);
  
  if(this.unprovidedTokens(map) !== false) {
    var diff = this.unprovidedTokens(map);
    throw new Error(`string-placehold: value-token mismatch. No values provided for ${diff.length} placeholders. offending tokens : ${diff.join(", ")}`);
  }
  
  var valuesInOrder = this.mapTokensToValues(map);
  return this.stringValueJoin(valuesInOrder);
};

module.exports = Placeholded;