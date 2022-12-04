const { Console } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE, NEW_LINE } = require('../utils/messages');

const InputView = {
  readNumbers(callback) {
    try {
      Console.readLine(INPUT_MESSAGE.NUMBERS, callback);
    } catch (error) {
      Console.close();
    }
  },

  readCommand(callback) {
    try {
      Console.readLine(INPUT_MESSAGE.COMMAND + NEW_LINE, callback);
    } catch (error) {
      Console.close();
    }
  },
};

module.exports = InputView;
