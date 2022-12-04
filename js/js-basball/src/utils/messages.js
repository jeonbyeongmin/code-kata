const NEW_LINE = '\n';

const OUTPUT_MESSAGE = {
  START: '숫자 야구 게임을 시작합니다.',
  QUIT: '3개의 숫자를 모두 맞히셨습니다! 게임 종료',
};

const INPUT_MESSAGE = {
  NUMBERS: '숫자를 입력해주세요 : ',
  COMMAND: '게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.',
};

const ERROR_MESSAGE = {
  NAN: '숫자를 입력해주세요',
  DUPLICATE: '중복되는 숫자는 입력할 수 없습니다.',
  INVALID_COMMAND: '1 혹은 2를 입력해주세요.',
  OVER_MAX: (maxLength) => `문자열의 길이는 ${maxLength}을 넘을 수 없습니다.`,
};

module.exports = {
  NEW_LINE,
  OUTPUT_MESSAGE,
  INPUT_MESSAGE,
  ERROR_MESSAGE,
};
