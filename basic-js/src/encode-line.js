const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let encode = str.split("");
  let result = [];

  for (let i = 0; i < encode.length; i++) {
    if (encode[i] == encode[i + 1] && encode[i] !== encode[i - 1]) {
      let count = 2;
      for (let k = i + 2; k < encode.length; k++) {
        if (encode[i] == encode[k]) count++;
      }
      result.push(count + encode[i]);
    } else if (encode[i] !== encode[i - 1]) result.push(encode[i]);
  }

  return result.join("");
}

module.exports = {
  encodeLine,
};
