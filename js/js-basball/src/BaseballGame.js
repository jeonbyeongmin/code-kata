const { GAME, MAX_NUMBERS_LENGTH } = require('./utils/const');
const Validator = require('./utils/Validator');
const { readNumbers, readCommand } = require('./View/InputView');
const { printStartGame, printResult } = require('./View/OutputView');
const { Console } = require('@woowacourse/mission-utils');
const Converter = require('./utils/Converter.');

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
      const convertedNumbers = Converter.convertStringToNumbers(numbers);
      const result = this.#baseballGameManager.recordResult(convertedNumbers);
      printResult(result.ball, result.strike);

      result.strike === 3 ? this.askRestart() : this.continueGame();
    });
  }

  askRestart() {
    readCommand((command) => {
      this.validateCommand(command);
      command === GAME.RESTART ? this.startGame() : this.quitGame();
    });
  }

  quitGame() {
    Console.close();
  }

  validateNumbers(numbers) {
    Validator.validateNumber(numbers);
    Validator.validateDuplicate(numbers);
    Validator.validateBound(numbers, MAX_NUMBERS_LENGTH);
  }

  validateCommand(command) {
    Validator.validateCommand(command);
  }
}

module.exports = BaseballGame;
