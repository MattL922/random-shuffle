var crypto = require("crypto");

/**
* Generates a random number from 0 to range-1 inclusive.
*
* @param {number} range The max random number to generate (exclusive).
* @returns {number} An integer from the range [0, range-1].
*/
function getRand(range)
{
  // This line could be sped up by using a lookup
  var cutoff = Math.floor(65536 / range) * range - 1,
      buf    = null;
  try
  {
    buf = crypto.randomBytes(2);
  }
  catch(err)
  {
    // Entropy source most likely drained.  Using psuedoRandomBytes.
    buf = crypto.pseudoRandomBytes(2);
  }
  var num = buf.readUInt16BE(0);
  // To avoid bias, throw out numbers that are greater than 'cutoff'
  // and pick again. The modulo here is unbiased because 'cutoff' is a
  // multiple of 'range'.
  return (num > cutoff) ? getRand(range) : num % range;
}

/**
* Shuffles the given array using the Fisher-Yates algorithm.
*
* @param {array} arr The array to shuffle
* @returns {array} The shuffled array
*/
function shuffle(arr)
{
  for(i = arr.length - 1; i > 0; i--)
  {
    var j = getRand(i+1);
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

module.exports = {
  getRand: getRand,
  shuffle: shuffle
};
