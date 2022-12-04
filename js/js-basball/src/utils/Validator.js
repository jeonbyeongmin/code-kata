const { ERROR_MESSAGE } = require('./messages');

const Validator = {
  /**
   * 숫자로 구성된 문자열인지 검사한다.
   * @param {string} numbers
   */
  validateNumber(numbers) {
    const regex = /^[0-9]+$/;
    if (!regex.test(numbers)) throw new Error(ERROR_MESSAGE.NAN);
  },

  /**
   * 중복되는 문자가 존재하는지 검사한다.
   * @param {string} str
   */
  validateDuplicate(str) {
    const charSet = new Set([...str]);
    if (charSet.size !== str.length) {
      throw new Error(ERROR_MESSAGE.DUPLICATE);
    }
  },

  /**
   * 문자열의 길이를 검증한다.
   * @param {string} str
   * @param {number} maxLength
   */
  validateBound(str, maxLength) {
    if (str.length > maxLength) {
      throw new Error(ERROR_MESSAGE.OVER_MAX(maxLength));
    }
  },

  /**
   * 1 혹은 2인지 검사한다.
   * @param {string} number
   */
  validateCommand(number) {
    if (number !== '1' && number !== '2') {
      throw new Error(ERROR_MESSAGE.INVALID_COMMAND);
    }
  },
};

module.exports = Validator;
