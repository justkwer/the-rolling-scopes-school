const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  mode = true;

  constructor(mode) {
    if (mode === false) this.mode = mode;
  }

  encrypt(message, key) {
    this.testParam(message, key);
    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = "";

    for (let i = 0, k = 0; i < message.length; i++) {
      let charCode = message.charCodeAt(i);

      if (charCode >= 65 && charCode <= 90) {
        let keyCode = key.charCodeAt(k % key.length);
        let cipCode = ((charCode - 65 + keyCode - 65) % 26) + 65;

        k++;
        result += String.fromCharCode(cipCode);
      } else {
        result += message[i];
      }
    }
    return this.mode ? result : result.split("").reverse().join("");
  }

  decrypt(message, key) {
    this.testParam(message, key);
    message = message.toUpperCase();
    key = key.toUpperCase();
    let result = "";

    for (let i = 0, k = 0; i < message.length; i++) {
      let charCode = message.charCodeAt(i);

      if (charCode >= 65 && charCode <= 90) {
        let keyCode = key.charCodeAt(k % key.length);
        let mm = charCode >= keyCode ? charCode - keyCode : charCode + 26 - keyCode;
        let cipCode = (mm % 26) + 65;
        k++;
        result += String.fromCharCode(cipCode);
      } else result += message[i];
    }

    return this.mode ? result : result.split("").reverse().join("");
  }

  testParam(message, key) {
    if (message === undefined || key === undefined) throw new Error("Incorrect arguments!");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
