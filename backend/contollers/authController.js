const catchAsyncError = require("../middleware/catchAysncError");
const UserModel = require("../models/userModel");
const sendToken = require("../utils/jwt");
const errorHandler = require("../utils/errorHandler");
const { now } = require("mongoose");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

// Register user  -    /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body; //using de-structuring method  to extract data from the request body
  let avatar; // undifined
  // console.log(req.file);
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.file) {
    avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
  }
  const user = await UserModel.create({
    name,
    email,
    password,
    avatar,
  });
  // const token = user.getJwtToken();
  // res.status(201).json({
  //   success: true,
  //   user,
  //   token,
  // });
  sendToken(user, 201, res);
});

//Login user  -     /
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body; // get data from req body using destructuring
  // ------------------// to check  whether the fields are empty or not
  if (!email || !password) {
    return next(new errorHandler(400, "please enter email and password"));
  }

  const user = await UserModel.findOne({ email }).select("+password"); //  select is used for picking specific field from database eg:- passwrod
  //checking  if the user exists
  if (!user) {
    return next(new errorHandler(401, "invalid email or password"));
  }
  // console.log(await user.isValidPassword(password), password);
  if (!(await user.isValidPassword(password))) {
    return next(new errorHandler(401, "ivalid email or password"));
  }
  // res.status(201).json({
  //   success: true,
  //   user,
  // });
  sendToken(user, 201, res);
});

// Logout user  --    /api/v1/logout
exports.logoutUser = (req, res, next) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .status(200)
    .json({
      success: true,
      message: "Logged out successfully",
    });
};

// Forgot Password  -  /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body; // get email  from request body using destructuring method

  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new errorHandler(404, "no user found with this email"));
  }
  const resetToken = await user.getResetToken();
  //  ------if getResetToken function is defined as arrow function like ()=> we need acces the below code.
  //------------generate hash token set to resetpasswordtoken field
  // user.resetPasswordToken = crypto
  //   .Hash("sha256")
  //   .update(resetToken)
  //   .digest("hex"); //convert it into hashed token
  // //set token expire time
  // user.resetPasswordTokeExpire = Date.now() + 30 * 60 * 1000;
  // // console.log(this.resetPasswordToken, this.resetPasswordTokeExpire);

  try {
    await user.save({ validateBeforeSave: false });
    // console.log("User document saved successfully.");
    // ... rest of the code
    // console.log(user.resetPasswordToken);
  } catch (err) {
    console.error(err);
    return next(new errorHandler(500, err.message));
  }

  let BASE_URL = process.env.FRONTEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  const resetURL = `${BASE_URL}/reset/${resetToken}`;

  const message = `you password reset url is as follows \n\n  ${resetURL}\n\n If you have not requested this email, then ignore it`;
  try {
    //utility function
    sendEmail({
      email: user.email,
      subject: "JDcart password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email has been sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokeExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new errorHandler(500, err.message));
  }
});

// Reset Password   -  /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .Hash("sha256")
    .update(req.params.token)
    .digest("hex"); //converted  token to original one
  const user = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordTokeExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return next(
      new errorHandler(400, "Password reset token  is invalid or expired")
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new errorHandler(400, "Passwords does not match"));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokeExpire = undefined;
  await user.save({ validateBeforeSave: false });
  sendToken(user, 201, res);
});

// get user profile  -   /api/v1/myprofile
exports.getProfile = catchAsyncError(async function (req, res, next) {
  const user = await UserModel.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

// change password  -   /api/v1/password/change
exports.changePassword = catchAsyncError(async function (req, res, next) {
  const user = await UserModel.findById(req.user.id).select("+password");

  if (!(await user.isValidPassword(req.body.currentPassword))) {
    return next(new errorHandler(400, "Your current password is wrong!"));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new errorHandler(400, "Passwords does not match"));
  }
  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

// update profile   -    api/v1/updateprofile
exports.updateProfile = catchAsyncError(async function (req, res, next) {
  let newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // console.log("name", newUserData.name, "email", newUserData.email);
  let avatar; // undifined

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.file) {
    avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
    newUserData = { ...newUserData, avatar };
  }

  const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin: Get All Users  -    /admin/users

exports.getAllUsers = catchAsyncError(async function (req, res, next) {
  const users = await UserModel.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Admin: Get Specific User  -  /admin/user/:id

exports.getUser = catchAsyncError(async function (req, res, next) {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(
      new errorHandler(400, `No user found with that id ${req.params.id} `)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin: Update user  -
exports.updateUser = catchAsyncError(async function (req, res, next) {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await UserModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    user,
  });
});

// Admin: Delete User  -
exports.deleteUser = catchAsyncError(async function (req, res, next) {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    return next(
      new errorHandler(400, `No user found with that id ${req.params.id} `)
    );
  }
  await UserModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "user Deleted successfully",
  });
});
