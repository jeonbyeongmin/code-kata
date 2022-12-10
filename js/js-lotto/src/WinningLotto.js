class WinningLotto {
  #lotto;
  #bonusNumber;

  /**
   * @param {Lotto[]} lotto
   * @param {number} bonusNumber
   */
  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  /**
   * 보너스 숫자 검증
   */
  validateBonus() {}

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
