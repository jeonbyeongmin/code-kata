const { Console } = require('@woowacourse/mission-utils');
const { OUTPUT_MESSAGE } = require('../utils/messages');

const OutputView = {
  printNewLine() {
    Console.print('');
  },
  /**
   * 구입금액에 따른 로또 구매 개수를 출력한다
   * @param {number} count
   */
  printPurchaseCount(count) {
    OutputView.printNewLine();
    Console.print(OUTPUT_MESSAGE.PURCHASE_COUNT(count));
  },

  /**
   * 로또를 출력한다
   * @param {number[]} numbers
   */
  printNumbers(numbers) {
    Console.print(`[${numbers.join(', ')}]`);
  },

  /**
   * 당첨 통계를 출력한다
   */
  printStats(result) {
    OutputView.printNewLine();
    const { fifth, fourth, third, second, first } = result;
    Console.print(OUTPUT_MESSAGE.STATS);
    Console.print(OUTPUT_MESSAGE.DIVIDER);
    Console.print(OUTPUT_MESSAGE.FIFTH(fifth));
    Console.print(OUTPUT_MESSAGE.FOURTH(fourth));
    Console.print(OUTPUT_MESSAGE.THIRD(third));
    Console.print(OUTPUT_MESSAGE.SECOND(second));
    Console.print(OUTPUT_MESSAGE.FIRST(first));
  },

  /**
   * 당첨 통계를 출력한다
   * @param {number} rate
   */
  printRate(rate) {
    Console.print(OUTPUT_MESSAGE.RATE(rate));
  },
};

module.exports = OutputView;
