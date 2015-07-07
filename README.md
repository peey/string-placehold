# string-placehold

A string template module for named or numbered placeholded strings and their interpolation, currying and more! (Based on ES6 template strings)

## Examples

Include by : 
```js
var placehold = require("string-placehold");
```

#### Named placeholders

```js
var template = placehold `Greetings ${"name"}, welcome to ${"place"}.`
 
var result = template({
  name: "earthling",
  place: "mars"
});
//result -> "Greetings earthling, welcome to mars."

```

#### Numbered placeholders
```js

var template = placehold `Greetings ${0}, welcome to ${1}.`

var result = template("earthling", "mars");
//result -> "Greetings earthling, welcome to mars."

//You can also pass in an array, it works by associating the placeholder with the array element on the index
var result = template(["earthling", "mars"]);

//or use the numbered placeholders in an object, since that's how they are treated internally
var result = template({
  0 : "earthling",
  1 : "mars"
});

```

### Currying

Currying allows you to pass in the values for tokens partially, a function is returned to accept more values till all values have been passed and the resulting string is returned.

```js
var template = placehold `Greetings ${0}, welcome to ${1}.`;

var curried = template.curry();
curried("earthling")("mars");
//result -> "Greetings earthlings, welcome to mars.";
```

Note that using the above example, 
```js
var template = placehold `Greetings ${0}, welcome to ${1}.`;

var curried = template.curry();
var newTemplate = curried("earthling");
```
is equivalent to

```js
var newTemplate = placehold `Greetings earthling, welcome to ${0}.`;
```

You may also

```js
//use named placeholders in currying
var template = placehold `Greetings ${"name"}, welcome to ${"place"}.`;

var curried = template.curry();
var result = curried({name: "earthling"})({place: "mars"});
//result -> "Greetings earthling, welcome to mars."

//specify named placeholders in any order
var result = curried({place: "mars"})({name: "earthling"});

//and even specify numbered placeholders in arbitary order
var template = placehold `Greetings ${0}, welcome to ${1}.`;
var curried = template.curry();
var result = curried({1: "mars"})({0: "earthling"});
```
## Installation

`npm install string-placehold`

## Compatibility

Please note that this package is based on and requires support for `ES6 template strings`. Please ensure that your version of nodejs or iojs supports ES6 Template Strings. This package has been tested and works on `iojs v2.3.1`.

## Licence

MIT