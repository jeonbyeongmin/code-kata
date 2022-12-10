class Lotto {
  #numbers;

  /**
   * @param {number[]} numbers
   */
  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error();
    }
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
