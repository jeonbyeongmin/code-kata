const { Console } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE, NEW_LINE } = require('../utils/messages');

const InputView = {
  readNumbers(callback) {
    Console.readLine(INPUT_MESSAGE.NUMBERS, callback);
  },

  readCommand(callback) {
    Console.readLine(INPUT_MESSAGE.COMMAND + NEW_LINE, callback);
  },
};

module.exports = InputView;
