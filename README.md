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

var result = template("interpolation", "example");
//result -> "Greetings earthling, welcome to mars."

//You can also pass in an array, it works by associating the placeholder with the array element on the index
var result = template(["lovely", "neat"]);
//result -> "Greetings earthling, welcome to mars."

```
## Installation

`npm install string-placehold`

## Licence

MIT