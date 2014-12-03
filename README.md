random-shuffle
==============

The shuffling algorithm that DOES NOT use Math.random()

This algorithm uses the crypto package which makes use of /dev/random and
/dev/urandom.  Having a hardware rng will produce a better source of entropy,
but is not required.

Two public functions are exposed: **getRand(range)** and **shuffle(arr)**.

**getRand(range)** returns a random integer from [0, range)

**shuffle(arr)** shuffles the passed in array in-place.  The array can contain
elements of any type (or multiple types).

**Example:**
```
var rs = require("random-shuffle");

var arr = [123, "abc", {"field": "value"}];

// shuffle an array

rs.shuffle(x); // may return ["abc", {"field": "value"}, 123]

// or generate random numbers

rs.getRand(10); // may return 4
```
