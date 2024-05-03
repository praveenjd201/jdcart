const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV == "development") {
    if (err.name == "ValidationError") {
      err.statusCode = 400;
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }

  if (process.env.NODE_ENV == "production") {
    let message = err.message;
    let error = new ErrorHandler(err.statusCode, message);
    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((val) => val.message);
      error = new ErrorHandler(400, message);
    }
    if (err.name == "CastError") {
      message = `Resource not found: ${err.path}.`;
      error = new ErrorHandler(400, message);
    }
    if (err.code == 11000) {
      message = `Duplicate ${Object.keys(err.keyValue)} entered error`;
      error = new ErrorHandler(400, message);
    }
    if (err.name == "JSONWebTokenError") {
      message = `JSON Web Token is invalid. Try again`;
      error = new ErrorHandler(400, message);
    }

    if (err.name == "TokenExpiredError") {
      let message = `JSON Web Token is expired. Try again`;
      error = new ErrorHandler(400, message);
    }

    res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internel server Error",
    });
  }
};
