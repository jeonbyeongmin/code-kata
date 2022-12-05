const BaseballGameManager = require('../src/BaseballGameManager');

describe('BaseballGameManager 테스트', () => {
  test('1이면 strike 2이면 ball count를 올려 이를 반환한다.', () => {
    const baseballGameManager = new BaseballGameManager();
    const statuses = [1, 2, 0];
    const answer = {strike: 1, ball: 1}

    const result = baseballGameManager.recordResult(statuses);
    expect(result).toEqual(answer)
  });
});
