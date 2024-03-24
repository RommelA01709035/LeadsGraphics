# is-object-like [![Build Status](https://travis-ci.org/bendrucker/is-object-like.svg?branch=master)](https://travis-ci.org/bendrucker/is-object-like)

> Check if a value can be assigned properties (objects and functions)

## Install

```
$ npm install --save is-object-like
```

## Usage

```js
var isObjectLike = require('is-object-like')
isObjectLike({}) // true
isObjectLike(function () {}) // true
isObjectLike(null) // false
```

## API

#### `isObjectLike(value)` -> `boolean`

##### value

*Required*  
Type: `any`

The value to type check.

## License

MIT © [Ben Drucker](http://bendrucker.me)
