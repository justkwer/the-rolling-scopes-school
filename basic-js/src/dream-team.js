const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create name of dream team based on the names of its members
 *
 * @param {Array} members names of the members
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 *
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(arr) {
  let dreamTeam = [];

  if (Array.isArray(arr)) {
    arr.forEach((el) => {
      if (typeof el == "string") dreamTeam.push(el);
    });
  } else return false;

  return dreamTeam
    .map((el) => el.trimLeft().toUpperCase())
    .sort()
    .map((el) => el[0])
    .join("");
}

module.exports = {
  createDreamTeam,
};
