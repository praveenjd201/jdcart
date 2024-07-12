const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
  },
  email: {
    type: String,
    required: [true, "please Enter  Your Email Address"],
    unique: true,
    validate: [validator.isEmail, "please provide valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    maxlength: [6, "password cannot exceed  6 characters"],
    select: false, //------------------------------- hides the password from being shown in queries by default
  },
  avatar: { type: String },
  role: { type: String, default: "user" },
  resetPasswordToken: String,
  resetPasswordTokeExpire: Date,
  createdAT: { type: Date, default: Date.now() },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
//  method to authenticate user
userSchema.methods.isValidPassword = async function (enterdPassword) {
  return bcrypt.compare(enterdPassword, this.password);
};

//method to generate to for forgot passwrod
userSchema.methods.getResetToken = function () {
  //generate token
  const token = crypto.randomBytes(20).toString("hex"); //returns random string of length 20
  //generate hash token set to resetpasswordtoken field
  this.resetPasswordToken = crypto.Hash("sha256").update(token).digest("hex"); //convert it into hashed token
  //set token expire time
  this.resetPasswordTokeExpire = Date.now() + 30 * 60 * 1000;
  // console.log(this.resetPasswordToken, this.resetPasswordTokeExpire);
  return token;
};

let userModel = mongoose.model("User", userSchema);
module.exports = userModel;
