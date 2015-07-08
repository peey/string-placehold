var _ = require("lodash");

var Curry = function (placeholded, map, counter) {
  this.placeholded = placeholded;
  this.map = map || {};
  this.sequentialArgCounter = counter || 0;
};

Curry.prototype.parseInterpolateArguments = function () {
  var args = Array.prototype.slice.call(arguments);
  var that = this;
  
  if(!_.isArray(args[0]) && !_.isObject(args[0])) {
    //neither array, nor object but a list of arguments were provided
    return _.transform(args, function (accumulator, value) {
      accumulator[that.sequentialArgCounter] = value;
      that.sequentialArgCounter++;
    }, {});
    
  } else {
    return this.placeholded.parseInterpolateArguments.apply(this.placeholded, args);
  }
};

Curry.prototype.interpolate = function () {
  var providedMap = this.parseInterpolateArguments.apply(this, arguments);
  
  var newMap = _.extend({}, this.map, providedMap);
  var unprovidedTokens = this.placeholded.unprovidedTokens(newMap);
  
  if(unprovidedTokens) {
    return (new Curry(this.placeholded, newMap, this.sequentialArgCounter)).interpolateClosure();
  } else {
    return this.placeholded.interpolate(newMap);
  }
};

Curry.prototype.interpolateClosure = function () {
  return _.callback(this.interpolate, this);
};

module.exports = Curry;