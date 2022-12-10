const RewardGiver = {
  REWARD: {
    FIRST: 2000000000,
    SECOND: 30000000,
    THIRD: 1500000,
    FOURTH: 50000,
    FIFTH: 5000,
  },

  give(result) {
    const { fifth, fourth, third, second, first } = result;

    const firstTotal = first * RewardGiver.REWARD.FIRST;
    const secondTotal = second * RewardGiver.REWARD.SECOND;
    const thirdTotal = third * RewardGiver.REWARD.THIRD;
    const fourthTotal = fourth * RewardGiver.REWARD.FOURTH;
    const fifthTotal = fifth * RewardGiver.REWARD.FIFTH;

    return firstTotal + secondTotal + thirdTotal + fourthTotal + fifthTotal;
  },
};

module.exports = RewardGiver;
