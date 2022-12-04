const { Console } = require('@woowacourse/mission-utils');
const { BASEBALL } = require('../utils/const');
const { OUTPUT_MESSAGE } = require('../utils/messages');

const OutputView = {
  printNewLink() {
    Console.print(OUTPUT_MESSAGE.NEW_LINE);
  },

  printStartGame() {
    Console.print(OUTPUT_MESSAGE.START);
  },

  /**
   * 사용자가 맞춤 볼, 스트라이크 개수를 출력하는 함수
   * @param {number} ballCount
   * @param {number} strikeCount
   */
  printGuessResult(ballCount, strikeCount) {
    let resultMessage = '';
    if (ballCount !== 0) resultMessage += `${ballCount}${BASEBALL.BAll} `;
    if (strikeCount !== 0) resultMessage += `${strikeCount}${BASEBALL.STRIKE}`;

    Console.print(resultMessage.trim());
  },

  printQuitGame() {
    Console.print(OUTPUT_MESSAGE.QUIT);
  },
};

module.exports = OutputView;
