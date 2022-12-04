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
   * 유저의 숫자와 정답 숫자를 비교하여 스트라이크와 볼의 개수를 세고 이를 반환한다.
   * @param {number[]} numbers
   * @return {{strike: number, ball: number}}
   */
  compare(numbers) {
    return;
  }
}

module.exports = WinningNumbers;
