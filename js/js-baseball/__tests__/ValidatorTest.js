const Validator = require('../src/utils/Validator');

describe('Validator 테스트', () => {
  test('문자열이 숫자로 구성되지 않았다면 예외를 발생해야 한다.', () => {
    expect(() => {
      Validator.validateNumber('abc');
    }).toThrow();
  });

  test('문자열에 중복된 문자가 있으면 예외를 발생해야 한다.', () => {
    expect(() => {
      Validator.validateDuplicate('112');
    }).toThrow();
  });

  test('문자열의 길이가 3이 아니라면 예외를 발생해야 한다.', () => {
    expect(() => {
      Validator.validateLength('1234', 3);
    }).toThrow();
  });

  test('문자열의 digits이 범위를 벗어나면 예외를 발생해야 한다.', () => {
    expect(() => {
      Validator.validateBound('023', 1, 9);
    }).toThrow();
  });

  test('문자열의 1 혹은 2가 아니면 예외를 발생해야 한다.', () => {
    expect(() => {
      Validator.validateCommand('3');
    }).toThrow();
  });
});
