const Validator = {
  validatePrice(price) {
    if (Number(price) % 1000 !== 0) {
      throw new Error('[ERROR]');
    }
  },
};

module.exports = Validator;
