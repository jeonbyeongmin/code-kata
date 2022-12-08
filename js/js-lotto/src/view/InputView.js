const { Console } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE, NEW_LINE } = require('../utils/messages');

const InputView = {
  readPrice(callback) {
    Console.readLine(INPUT_MESSAGE.PRICE, callback);
  },

  readNumbers(callback) {
    Console.readLine(INPUT_MESSAGE.NUMBERS + NEW_LINE, callback);
  },

  readBonus(callback) {
    Console.readLine(INPUT_MESSAGE.BONUS + NEW_LINE, callback);
  },
};

module.exports = InputView;
