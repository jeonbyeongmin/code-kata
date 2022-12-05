const Converter = {
  /**
   * string을 digits 배열로 변환하는 함수
   * @param {string} str
   */
  convertStringToNumbers(str) {
    return [...str].map((char) => Number(char));
  },
};

module.exports = Converter;
