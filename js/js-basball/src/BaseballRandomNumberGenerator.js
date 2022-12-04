const { Random } = require('@woowacourse/mission-utils');

const BaseballRandomNumberGenerator = {
  PICK_COUNT: 1,
  NUMBER_RANGE: 9,
  generate() {
    return Random.pickNumberInRange(this.PICK_COUNT, this.NUMBER_RANGE);
  },
};

module.exports = BaseballRandomNumberGenerator;
