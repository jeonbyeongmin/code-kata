const { GAME_RESULT } = require('./utils/const');
const WinningNumbers = require('./WinningNumbers');

class BaseballGameManager {
  #winningNumbers;

  constructor() {
    this.#winningNumbers = new WinningNumbers();
  }

  /**
   * 유저 숫자들을 정답 숫자와 비교하여 결과값을 기록하는 메서드
   * @param {*} numbers
   */
  recordResult(numbers) {
    const result = { strike: 0, ball: 0 };
    numbers.forEach((number, index) => {
      const status = this.#winningNumbers.compare(number, index);
      const resultKey = GAME_RESULT[status];
      result[resultKey] += 1;
    });
    return result;
  }
}

module.exports = BaseballGameManager;
