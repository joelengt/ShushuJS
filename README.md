# ShushuJS
[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

A Collection manager.

## Install
Use NPM to install with the command:

```
npm i -S shushujs
```

## How to use
Import ShushuJS inside your JS file using:

```javascript
var shushujs = require('shushujs');
```

Create your Collection passing the schema (must be an SukimaJS schema):

```javascript
var Users = shushujs(schema);
```

Listen the 'new' event:

```javascript
Users.on('new', function (err, evt) {
  if (err) throw err;
  // do something
});
```

Add new data:

```
Users.set({
  name: 'sergiodxa',
  email: 'sergio@xalambri.com.ar'
});
```

If you want to use it in browser just compile it using Browserify to create a browser compatible JS file.

Enjoy!

## Methods

### .set(datum)
Add a new datum to the collection.

### .update(updatedDatum, value, field)
Modify an actual datum in the collection using the *field* and *value* the find the datum and replacing it with the updatedDatum

### .remove(value, field)
Remove an actual datum from the collection using the *field* and *value* the find the datum

### .getAll()
Return an array with all data in the collection.

### .getSingle(value, field)
Return a single datum from the collection using the *field* and *value* the find the datum.

## Events
All event listeners execute a callback returning two parameters, the first is *error* and the second is the event info.

### new
This event is emitted when a new data is setted to the collection using the method .set().

The event info return an object with the next attributes:

* old: the old collection array (with out the added datum).
* data: the actual collection array.
* added: the datum added

### updated
This event is emitted when a datum is modified in the collection using the method .update().

The event info return an object with the next attributes:

* old: the old collection array (with out the added datum).
* data: the actual collection array.
* updated: an object with the attributes:
* * datum: the new datum.
* * field: the field used to find the datum.
* * value: the value used to find the datum.

### removed
This event is emitted when a datum is removed from the collection using the method .remove().

The event info return an object with the next attributes:

* old: the old collection array (with out the added datum).
* data: the actual collection array.
* updated: the datum removed.

## Tests
To do tests just use the command:

```
npm test
```

## License
The MIT License (MIT)

Copyright (c) 2015 Sergio Daniel Xalambrí

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
