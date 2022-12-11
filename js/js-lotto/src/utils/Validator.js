const { ERROR_MESSAGE } = require('./messages');

const Validator = {
  validatePrice(price) {
    if (Number(price) % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.PRICE);
    }
  },

  validateLength(arr, length) {
    if (arr.length !== length) {
      throw new Error(ERROR_MESSAGE.LENGTH);
    }
  },

  validateNumber(numbers) {
    const regex = /^[0-9]+$/;
    if (!regex.test(numbers)) {
      throw new Error(ERROR_MESSAGE.NAN);
    }
  },

  /**
   * 각 digits이 min, max를 충족하는지 검증
   * @param {number} number
   * @param {number} min
   * @param {number} max
   */
  validateBound(number, min, max) {
    if (number < min || number > max) {
      throw new Error(ERROR_MESSAGE.BOUND);
    }
  },

  /**
   * arr에 number가 없는지 검증
   * @param {Lotto} lotto
   * @param {number} number
   */
  validateDuplicate(lotto, number) {
    if (lotto.contains(number)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE);
    }
  },
};

module.exports = Validator;
