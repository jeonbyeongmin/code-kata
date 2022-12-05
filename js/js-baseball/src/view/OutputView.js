const { Console } = require('@woowacourse/mission-utils');
const { BASEBALL } = require('../utils/const');
const { OUTPUT_MESSAGE, NEW_LINE } = require('../utils/messages');

const OutputView = {
  printNewLine() {
    Console.print(NEW_LINE);
  },

  printStartGame() {
    Console.print(OUTPUT_MESSAGE.START);
  },

  /**
   * 사용자가 맞춤 볼, 스트라이크 개수를 출력하는 함수
   * @param {number} ballCount
   * @param {number} strikeCount
   */
  printResult(ballCount, strikeCount) {
    let result = '';
    if (ballCount !== 0) result += `${ballCount}${BASEBALL.BAll} `;
    if (strikeCount !== 0) result += `${strikeCount}${BASEBALL.STRIKE}`;

    Console.print(!!result ? result.trim() : BASEBALL.NOTHING);
  },

  printQuitGame() {
    Console.print(OUTPUT_MESSAGE.QUIT);
  },
};

module.exports = OutputView;
