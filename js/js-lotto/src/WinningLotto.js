const { LOTTO } = require('./utils/const');
const {
  validateNumber,
  validateBound,
  validateDuplicate,
} = require('./utils/Validator');

class WinningLotto {
  #lotto;
  #bonusNumber;

  /**
   * @param {Lotto} lotto
   * @param {number} bonusNumber
   */
  constructor(lotto, bonusNumber) {
    validateBonus(bonusNumber);
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  /**
   * 보너스 숫자 검증
   */
  validateBonus(number) {
    validateNumber(number);
    validateBound(Number(number), LOTTO.MIN, LOTTO.MAX);
    validateDuplicate(this.#lotto, number);
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  getLotto() {
    return this.#lotto;
  }

  getWinningLotto() {
    return {
      winningNumbers: this.getLotto(),
      bonusNumber: this.getBonusNumber(),
    };
  }
}

module.exports = WinningLotto;
