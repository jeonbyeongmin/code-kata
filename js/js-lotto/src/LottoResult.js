const PrizeGiver = require('./PrizeGiver');
const RewardGiver = require('./RewardGiver');

class LottoResult {
  #result;

  constructor() {
    this.#result = { first: 0, second: 0, third: 0, fourth: 0, fifth: 0 };
  }

  countPrize(matchedCount, isBonusCorrect) {
    const prize = PrizeGiver.give(matchedCount, isBonusCorrect);
    if (prize === 'none') return;

    this.#result[prize] += 1;
  }

  calculateProfitRate(price, totalReward) {
    const profitRate = (totalReward / price) * 100;
    return profitRate.toFixed(1);
  }

  calculateTotalReward() {
    return RewardGiver.give(this.#result);
  }

  getResult() {
    return this.#result;
  }
}

module.exports = LottoResult;
