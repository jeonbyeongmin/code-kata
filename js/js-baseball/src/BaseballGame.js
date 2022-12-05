const { readNumbers, readCommand } = require('./View/InputView');
const {
  printStartGame,
  printResult,
  printQuitGame,
} = require('./View/OutputView');
const {
  GAME,
  NUMBERS_LENGTH,
  MIN_NUMBER,
  MAX_NUMBER,
} = require('./utils/const');
const { Console } = require('@woowacourse/mission-utils');
const Validator = require('./utils/Validator');
const Converter = require('./utils/Converter');
const BaseballGameManager = require('./BaseballGameManager');

class BaseballGame {
  #baseballGameManager;

  play() {
    printStartGame();
    this.startGame();
  }

  startGame() {
    this.#baseballGameManager = new BaseballGameManager();
    this.continueGame();
  }

  continueGame() {
    readNumbers((numbers) => {
      this.validateNumbers(numbers);
      const convertedNum = Converter.convertStringToNumbers(numbers);
      const statuses = this.#baseballGameManager.compareNumbers(convertedNum);
      const result = this.#baseballGameManager.recordResult(statuses);
      printResult(result.ball, result.strike);

      result.strike === 3 ? this.askRestart() : this.continueGame();
    });
  }

  askRestart() {
    printQuitGame();
    readCommand((command) => {
      this.validateCommand(command);
      command === GAME.RESTART ? this.startGame() : this.quitGame();
    });
  }

  quitGame() {
    Console.close();
  }

  /**
   * @param {string} numbers
   */
  validateNumbers(numbers) {
    Validator.validateNumber(numbers);
    Validator.validateDuplicate(numbers);
    Validator.validateBound(numbers, MIN_NUMBER, MAX_NUMBER);
    Validator.validateLength(numbers, NUMBERS_LENGTH);
  }

  /**
   * @param {string} command
   */
  validateCommand(command) {
    Validator.validateCommand(command);
  }
}

module.exports = BaseballGame;
