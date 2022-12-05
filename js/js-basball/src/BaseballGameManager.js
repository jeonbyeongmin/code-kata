const { GAME_RESULT } = require('./utils/const');
const WinningNumbers = require('./WinningNumbers');

class BaseballGameManager {
  #winningNumbers;

  constructor() {
    this.#winningNumbers = new WinningNumbers();
  }

  /**
   * 결과값을 기록하는 메서드
   * @param {number[]} statuses
   */
  recordResult(statuses) {
    const result = { strike: 0, ball: 0 };
    statuses.forEach((status) => {
      const resultKey = GAME_RESULT[status];
      if (resultKey !== 'nothing') result[resultKey] += 1;
    });
    return result;
  }

  /**
   * 유저 숫자를 비교하는 메서드
   * @param {number[]} numbers
   * @returns
   */
  compareNumbers(numbers) {
    const statuses = [];
    numbers.forEach((number, index) => {
      const status = this.#winningNumbers.compare(number, index);
      statuses.push(status);
    });
    return statuses;
  }
}

module.exports = BaseballGameManager;
