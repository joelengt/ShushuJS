var events = require('events');
// polyfill for Array.from
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}

function shushujs (schema) {
  'use strict';

  // 1 step old data
  var old  = [];

  // actual data
  var data = [];

  // instance of event emitter
  var collection = new events.EventEmitter();

  // sukimajs's schema
  collection.schema = schema;

  // method to add new datum to data array
  collection.set = function setData (datum) {
    var isValid = this.schema.validate(datum);

    if (isValid !== true) {
      this.emit('new', {
        error: isValid,
        datum: datum
      });
    }

    old = Array.from(data);
    data.push(datum);

    this.emit('new', null, {
      old  : old,
      data : data,
      added: datum
    });

    return this;
  };

  // method to change a datum from the data array
  collection.update = function updateData (updatedDatum, value, field) {
    var field = field || 'id';

    old = Array.from(data);
    data = data.map(function (oldDatum) {
      if (updatedDatum[field] === value) {
        return updatedDatum;
      }
      return oldDatum;
    });

    this.emit('updated', null, {
      old: old,
      data: data,
      updated: {
        datum: updatedDatum,
        field: field,
        value: value
      }
    });

    return this;
  };

  // method to remove a datum from the data array
  collection.remove = function removeData (value, field) {
    var field = field || 'id';
    var oldDatum;

    old = Array.from(data);
    data = data.filter(function (datum) {
      if (datum[field] === value) {
        oldDatum = datum;
      }

      return (datum[field] !== value);
    });

    this.emit('removed', null, {
      old: old,
      data: data,
      removed: oldDatum
    });

    return this;
  };

  // method to get the data array
  collection.getAll = function getAll () {
    return data
  };

  // method to get a single datum from the data array
  collection.getSingle = function getSingle (value, field) {
    var datum = data.filter (function (datum) {
      return (datum[field] === value);
    })[0];

    if (datum === undefined) {
      return new Error('Datum not found')
    }
    return datum;
  };

  return collection;
}

module.exports = shushujs;