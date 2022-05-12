const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: [],

  clear() {
    this.chain = [];
    return this;
  },

  getLength() {
    return this.chain.length;
  },

  addLink(value = "") {
    this.chain.push(`( ${value} )`);
    return this;
  },

  removeLink(pos) {
    if (!this.chain[pos - 1]) {
      this.clear();
      throw new Error("You can't remove incorrect link!");
    }

    this.chain = this.chain.filter((_, index) => pos - 1 !== index);
    return this;
  },

  reverseChain() {
    this.chain = this.chain.reverse();
    return this;
  },

  finishChain() {
    const result = this.chain.join("~~");
    this.clear();
    return result;
  },
};

module.exports = {
  chainMaker,
};
