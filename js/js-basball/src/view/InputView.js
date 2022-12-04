const { Console } = require('@woowacourse/mission-utils');
const { INPUT_MESSAGE } = require('../utils/messages');

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
      Console.readLine(INPUT_MESSAGE.COMMAND, callback);
    } catch (error) {
      Console.close();
    }
  },
};

module.exports = InputView;
