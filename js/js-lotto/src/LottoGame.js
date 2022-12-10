const LottoMachine = require('./LottoMachine');
const LottoResult = require('./LottoResult');
const { Console } = require('@woowacourse/mission-utils');
const { readPrice, readNumbers, readBonus } = require('./view/InputView');
const {
  printPurchaseCount,
  printNumbers,
  printStats,
  printRate,
} = require('./view/OutputView');

const LOTTO_PRICE = 1000;

class LottoGame {
  #price;
  #lottoMachine;
  #lottoResult;

  constructor() {
    this.#lottoMachine = new LottoMachine();
    this.#lottoResult = new LottoResult();
  }

  start() {
    this.publishLottos();
  }

  publishLottos() {
    readPrice((price) => {
      this.#price = price;
      const count = this.#price / LOTTO_PRICE;
      printPurchaseCount(count);

      const lottos = this.purchaseLottos(count);
      this.printLottos(lottos);
      this.publishWinningLotto(lottos);
    });
  }

  publishWinningLotto(lottos) {
    readNumbers((inputNumbers) => {
      readBonus((bonus) => {
        const numbers = inputNumbers.split(',').map((number) => Number(number));
        const winning = this.#lottoMachine.makeWinningLotto(numbers, bonus);
        this.matchLottos(lottos, winning);
        this.showResult();
      });
    });
  }

  showResult() {
    const reward = this.#lottoResult.calculateTotalReward();
    const rate = this.#lottoResult.calculateProfitRate(this.#price, reward);
    const result = this.#lottoResult.getResult();

    printStats(result);
    printRate(rate);
    this.quitGame();
  }

  quitGame() {
    Console.close();
  }

  matchLottos(lottos, winning) {
    lottos.forEach((lotto) => {
      const winningLotto = winning.getLotto();
      const bonus = winning.getBonusNumber();
      const matchedCount = lotto.matchCount(winningLotto);
      const isBonusCorrect = lotto.contains(bonus);
      this.#lottoResult.countPrize(matchedCount, isBonusCorrect);
    });
  }

  purchaseLottos(count) {
    const lottos = [];
    for (let i = 0; i < count; i++) {
      const lotto = this.#lottoMachine.makeLotto();
      lottos.push(lotto);
    }
    return lottos;
  }

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      printNumbers(lotto.getNumbers());
    });
  }
}

module.exports = LottoGame;
