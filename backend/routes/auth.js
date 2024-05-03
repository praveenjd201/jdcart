// import express from "express";
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getProfile,
  changePassword,
  updateProfile,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("../contollers/authController");
const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middleware/authenticate");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/password/change").put(isAuthenticatedUser, changePassword);
router.route("/myprofile").get(isAuthenticatedUser, getProfile);
router.route("/updateprofile").put(isAuthenticatedUser, updateProfile);

// Admin routes
router
  .route("/admin/users")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getUser)
  .put(isAuthenticatedUser, isAuthorizeRoles("admin"), updateUser)
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteUser);

module.exports = router;
