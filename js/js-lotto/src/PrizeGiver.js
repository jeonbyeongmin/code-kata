const PrizeGiver = {
  PRIZE: ['second', 'fifth', 'fourth', 'third', 'first'],

  give(matchedCount, isBonusCorrect) {
    if (matchedCount === 5 && isBonusCorrect) {
      return PrizeGiver.PRIZE[0];
    }

    if (matchedCount < 3) return 'none';

    const shiftedCount = matchedCount - 2;
    return PrizeGiver.PRIZE[shiftedCount];
  },
};

module.exports = PrizeGiver;
