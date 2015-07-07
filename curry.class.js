var _ = require("lodash");

var Curry = function (placeholded) {
  this.placeholded = placeholded;
  this.aggregateMap = {};
  this.sequentialArgCounter = 0;
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
  
   _.extend(this.aggregateMap, providedMap);
  var unprovidedTokens = this.placeholded.unprovidedTokens(this.aggregateMap);
  
  if(unprovidedTokens) {
    return this.interpolateClosure();
  } else {
    return this.placeholded.interpolate(this.aggregateMap);
  }
};

Curry.prototype.interpolateClosure = function () {
  return _.callback(this.interpolate, this);
};

module.exports = Curry;