const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  let rep = options.repeatTimes,
    sep = options.separator,
    add = options.addition,
    addRep = options.additionRepeatTimes,
    addSep = options.additionSeparator;

  rep === undefined ? (rep = 1) : (rep = rep);
  sep === undefined ? (sep = "+") : (sep = sep);
  add === undefined ? (add = "") : (add = add);
  addRep === undefined ? (addRep = 1) : (addRep = addRep);
  addSep === undefined ? (addSep = "|") : (addSep = addSep);

  return (
    (str + (add + addSep).repeat(addRep - 1) + add + sep).repeat(rep - 1) +
    str +
    (add + addSep).repeat(addRep - 1) +
    add
  );
}

module.exports = {
  repeater,
};
