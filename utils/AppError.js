class AppError extends Error {
  constructor(errorCode, errorMessage) {
    super();
    this.code = errorCode;
    this.message = errorMessage;
  }
}

module.exports = AppError;
