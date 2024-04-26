class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCostumError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

module.exports = { CustomAPIError, createCostumError };
