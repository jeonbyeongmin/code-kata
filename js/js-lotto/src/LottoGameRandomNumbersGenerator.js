const { Random } = require('@woowacourse/mission-utils');

const LottoGameRandomNumbersGenerator = {
  MIN: 1,
  MAX: 45,
  COUNT: 6,
  generate() {
    return Random.pickUniqueNumbersInRange(
      LottoGameRandomNumbersGenerator.MIN,
      LottoGameRandomNumbersGenerator.MAX,
      LottoGameRandomNumbersGenerator.COUNT
    );
  },
};

module.exports = LottoGameRandomNumbersGenerator;
