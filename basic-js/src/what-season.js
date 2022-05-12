const { NotImplementedError } = require("../extensions/index.js");

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
function getSeason(date) {
  if ((date instanceof Date === false || Object.getOwnPropertyNames(date).length > 0) && arguments.length > 0)
    throw new Error("Invalid date!");

  if (JSON.stringify(arguments) === "{}" && date instanceof Function === false)
    return "Unable to determine the time of year!";

  const month = date.getMonth();

  switch (month) {
    case 11:
    case 0:
    case 1:
      return "winter";

    case 2:
    case 3:
    case 4:
      return "spring";

    case 5:
    case 6:
    case 7:
      return "summer";

    default:
      return "autumn";
  }
}

module.exports = {
  getSeason,
};
