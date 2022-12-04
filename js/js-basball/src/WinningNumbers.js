const BaseballRandomNumberGenerator = require('./BaseballRandomNumberGenerator');

class WinningNumbers {
  #winningNumbers;

  constructor() {
    this.#winningNumbers = this.generateRandomNumbers();
  }

  generateRandomNumbers() {
    const numbers = [];
    while (numbers.length < 3) {
      const number = BaseballRandomNumberGenerator.generate();
      if (!numbers.includes(number)) numbers.push(number);
    }

    return numbers;
  }

  /**
   * 유저의 숫자와 정답 숫자를 비교하여 스트라이크면 1, 볼이면 2, 아무것도 아니면 0을 반환한다.
   * @param {number} number
   * @param {number} index
   * @return {0 | 1 | 2}
   */
  compare(number, index) {
    if (this.#winningNumbers[index] === number) return 1;
    if (this.#winningNumbers.includes(number)) return 2;
    return 0;
  }
}

module.exports = WinningNumbers;
