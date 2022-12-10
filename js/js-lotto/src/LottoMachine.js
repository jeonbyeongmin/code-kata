const LottoGameRandomNumbersGenerator = require('./LottoGameRandomNumbersGenerator');
const Lotto = require('./Lotto');
const WinningLotto = require('./WinningLotto');

class LottoMachine {
  makeLotto() {
    const numbers = LottoGameRandomNumbersGenerator.generate();
    return new Lotto(numbers);
  }

  /**
   * @param {number[]} numbers
   * @param {number} bonusNumber
   */
  makeWinningLotto(numbers, bonusNumber) {
    const lotto = new Lotto(numbers);
    return new WinningLotto(lotto, bonusNumber);
  }

  /**
   * 숫자인지 검증
   */
  validateNumbers() {}
  validateNumber() {}
}

module.exports = LottoMachine;
