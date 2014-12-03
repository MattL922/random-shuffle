var crypto = require("crypto");

/**
* Generates a random integer from 0 to range-1 inclusive.
*
* @param {number} range The max random integer to generate (exclusive).
* @returns {number} An integer from the range [0, range-1].
*/
function getRand(range)
{
  // figure out how many bytes are needed to generate an integer from [0, range)
  var numBytes = 1;
  while(Math.pow(2, numBytes * 8) <= range)
  {
    numBytes++;
  }
  var cutoff = Math.floor(Math.pow(2, numBytes * 8) / range) * range - 1,
      buf    = null,
      num    = cutoff + 1;
  // To avoid bias, throw out numbers that are greater than 'cutoff'
  // and pick again. The modulo here is unbiased because 'cutoff' is a
  // multiple of 'range'.
  while(num > cutoff)
  {
    try
    {
      buf = crypto.randomBytes(numBytes);
    }
    catch(err)
    {
      // Entropy source most likely drained.  Using psuedoRandomBytes.
      buf = crypto.pseudoRandomBytes(numBytes);
    }
    // convert the contents of the buffer to an number
    num = 0;
    for(var i = 0; i < numBytes; i++)
    {
      num += (buf.readUInt8(i) << 8 * (numBytes - i - 1));
    }
  }
  return num % range;
}

/**
* Shuffles the given array in place using the Fisher-Yates algorithm.
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
