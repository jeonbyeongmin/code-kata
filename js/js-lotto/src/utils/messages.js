const NEW_LINE = '\n';

const INPUT_MESSAGE = {
  PRICE: '구매금액을 입력해 주세요.',
  NUMBERS: '당첨 번호를 입력해 주세요.',
  BONUS: '보너스 번호를 입력해 주세요.',
};

const OUTPUT_MESSAGE = {
  PURCHASE_COUNT: (count) => `${count}개를 구매했습니다.`,
  STATS: '당첨 통계',
  DIVIDER: '---',
  FIFTH: (count) => `3개 일치 (5,000원) - ${count}개`,
  FOURTH: (count) => `4개 일치 (50,000원) - ${count}개`,
  THIRD: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  SECOND: (count) => `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  FIRST: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
  RATE: (rate) => `총 수익률은 ${rate}%입니다.`,
};

const ERROR_MESSAGE = {
  BOUND: '[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.',
  NAN: '[ERROR] 숫자를 입력해야 합니다.',
  PRICE: '[ERROR] 가격은 1000원 단위만 입력할 수 있습니다.',
  LENGTH: '[ERROR] 배열의 길이가 6이어여야 합니다.',
  DUPLICATE: '[ERROR] 로또 숫자는 중복될 수 없습니다.',
};

module.exports = {
  NEW_LINE,
  INPUT_MESSAGE,
  OUTPUT_MESSAGE,
  ERROR_MESSAGE,
};
