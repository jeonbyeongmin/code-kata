class WinningLotto {
  #lotto;
  #bonusNumber;

  /**
   * @param {number[]} lotto
   * @param {number} bonusNumber
   */
  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.#bonusNumber = bonusNumber;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  getLotto() {
    return this.#lotto;
  }
}

module.exports = WinningLotto;
