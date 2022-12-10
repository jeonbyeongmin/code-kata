const { Console } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE, NEW_LINE } = require('../utils/messages');

const InputView = {
  readPrice(callback) {
    Console.readLine(INPUT_MESSAGE.PRICE + NEW_LINE, callback);
  },

  readNumbers(callback) {
    Console.readLine(NEW_LINE + INPUT_MESSAGE.NUMBERS + NEW_LINE, callback);
  },

  readBonus(callback) {
    Console.readLine(NEW_LINE + INPUT_MESSAGE.BONUS + NEW_LINE, callback);
  },
};

module.exports = InputView;
