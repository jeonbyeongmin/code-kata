const { readNumbers } = require('./View/InputView');
const { printStartGame } = require('./View/OutputView');

class BaseballGame {
  play() {
    printStartGame();
    readNumbers();
  }
}

module.exports = BaseballGame;
