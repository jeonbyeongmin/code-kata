const { GAME_RESULT, GAME, MAX_NUMBERS_LENGTH } = require('./utils/const');
const Validator = require('./utils/Validator');
const { readNumbers, readCommand } = require('./View/InputView');
const { printStartGame, printResult } = require('./View/OutputView');
const WinningNumbers = require('./WinningNumbers');
const { Console } = require('@woowacourse/mission-utils');

class BaseballGame {
  #winningNumbers;

  play() {
    printStartGame();
    this.startGame();
  }

  startGame() {
    this.#winningNumbers = new WinningNumbers();
    this.continueGame();
  }

  continueGame() {
    readNumbers((numbers) => {
      this.validate();
      const validNumbers = this.convertStringToNumbers(numbers);
      const result = this.recordNumbers(validNumbers);
      printResult(result.ball, result.strike);

      result.strike === 3 ? this.askRestart() : this.continueGame();
    });
  }

  validate() {
    Validator.validateNumber(numbers);
    Validator.validateDuplicate(numbers);
    Validator.validateBound(numbers, MAX_NUMBERS_LENGTH);
  }

  askRestart() {
    readCommand((command) => {
      Validator.validateCommand(command);
      command === GAME.RESTART ? this.startGame() : this.quitGame();
    });
  }

  quitGame() {
    Console.close();
  }

  /**
   * string을 digits 배열로 변환하는 함수
   * @param {string} str
   */
  convertStringToNumbers(str) {
    return [...str].map((char) => Number(char));
  }

  /**
   *
   * @param {*} numbers
   */
  recordNumbers(numbers) {
    const result = { strike: 0, ball: 0 };
    numbers.forEach((number, index) => {
      const status = this.#winningNumbers.compare(number, index);
      const resultKey = GAME_RESULT[status];
      result[resultKey] += 1;
    });
    return result;
  }
}

module.exports = BaseballGame;
