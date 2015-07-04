# string-placehold

A string template module for named or numbered placeholded strings and their interpolation. Based on ES6 template string syntax.

## Examples

Include by : 
```js
var placehold = require("string-placehold");
```

Named placeholders

```js
var template = placehold `Greetings ${"name"}, welcome to ${"place"}.`
 
var result = template({
  name: "earthling",
  place: "mars"
});
//result -> "Greetings earthling, welcome to mars."

```

Numbered placeholders
```js

var template = placehold `Greetings ${0}, welcome to ${1}.`

var result = template("earthling", "mars");
//result -> "Greetings earthling, welcome to mars."

//You can also pass in an array, it works by associating the placeholder with the array element on the index
var result = template(["earthling", "mars"]);
//result -> "Greetings earthling, welcome to mars."

```
## Installation

`npm install string-placehold`

## Compatibility

Please note that this package is based on and requires support for ES6 template strings. Please ensure that your version of nodejs or iojs supports ES6 Template Strings. This package has been tested and works on iojs v2.3.1.

## Licence

MIT