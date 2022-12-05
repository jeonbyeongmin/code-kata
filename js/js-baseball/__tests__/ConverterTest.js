const Converter = require('../src/utils/Converter');

describe('Converter 테스트', () => {
  test('문자열을 digits 배열로 변환한다.', () => {
    const input = '123';
    const answer = [1, 2, 3];
    const converted = Converter.convertStringToNumbers(input);

    expect(converted).toEqual(answer);
  });
});
