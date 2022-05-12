const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  n = String(n).split("");
  let count = 0;

  for (let i = 0; i < n.length; i++) {
    let curArr = n;
    count = Math.max(count, curArr.slice(0, i).join("") + curArr.slice(i + 1).join(""));
  }

  return count;
}

module.exports = {
  deleteDigit,
};
