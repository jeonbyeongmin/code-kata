const WinningNumbers = require('../src/WinningNumbers');

describe('WinningNumbers 테스트', () => {
  test('number와 winning number 가 같으면 strike를 반환한다.', () => {
    const winningNumbers = new WinningNumbers();
    const isStrike = winningNumbers.isStrike(1, 1);
    const isBall = winningNumbers.isBall(1, [2, 1, 3]);

    expect(isStrike).toBeTruthy();
    expect(isBall).toBeTruthy();
  });
});
