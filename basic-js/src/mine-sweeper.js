const { NotImplementedError } = require("../extensions/index.js");

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    result[i] = [];
    for (let x = 0; x < matrix[i].length; x++) {
      result[i][x] = 0;
      for (yOffset = -1; yOffset <= 1; yOffset++) {
        for (xOffset = -1; xOffset <= 1; xOffset++) {
          if (matrix[i + yOffset] != undefined) {
            if (matrix[i + yOffset][x + xOffset] != undefined) {
              if (yOffset != 0 || xOffset != 0) {
                result[i][x] += matrix[i + yOffset][x + xOffset];
              }
            }
          }
        }
      }
    }
  }
  return result;
}

module.exports = {
  minesweeper,
};
