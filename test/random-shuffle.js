var rs     = require("../random-shuffle"),
    assert = require("assert");

/*
var distribution = [0, 0, 0, 0, 0];

for(var i = 0; i < 1000000; i++)
{
  distribution[rs.getRand(5)]++;
}

console.log(distribution);
*/

// Better test needed!

describe("Random Shuffle", function()
{
  it("should return each number in the range", function()
  {
    var nums = [0, 1, 2, 3, 4];
    while(nums.length)
    {
      var rand  = rs.getRand(5),
          index = nums.indexOf(rand);
      if(index > -1)
      {
        nums.splice(index, 1);
      }
    }
    assert.equal(nums.length, 0);
  });
});
