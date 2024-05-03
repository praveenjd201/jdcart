class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, ErrorHandler);
  }
}
module.exports = ErrorHandler;
