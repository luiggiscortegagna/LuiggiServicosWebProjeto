// cortesia do gpt.. nem sabia que era pra ter
class AppError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;