const { LOTTO } = require('./utils/const');
const { validateLength } = require('./utils/Validator');

const LOTTO_LENGTH = 6;
class Lotto {
  #numbers;

  /**
   * @param {number[]} numbers
   */
  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  /**
   * @param {number[]} numbers
   */
  validate(numbers) {
    validateLength(numbers, LOTTO_LENGTH);
    numbers.forEach((number) => {
      validateBound(number, LOTTO.MIN, LOTTO.MAX);
    });
  }

  /**
   * @param {number} number
   * @returns {boolean}
   */
  contains(number) {
    return this.#numbers.includes(number);
  }

  /**
   *
   * @param {Lotto} other
   * @returns {number}
   */
  matchCount(other) {
    return other.#numbers.reduce((count, current) => {
      return this.contains(current) ? (count += 1) : count;
    }, 0);
  }

  getNumbers() {
    return this.#numbers;
  }
}

module.exports = Lotto;
