const jwt = require("jsonwebtoken");
const catchAysncError = require("./catchAysncError");
const ErrorHandler = require("../utils/errorHandler");
const UserSchema = require("../models/userModel");

exports.isAuthenticatedUser = catchAysncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return next(
      new ErrorHandler(401, "Please Login First to  Access This resource")
    );
  const decode = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await UserSchema.findById(decode.id);
  // req.id = decode.id;
  next();
});

exports.isAuthorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(401, `Role ${req.user.role} is not allowed`)
      );
    }
    next();
  };
};
