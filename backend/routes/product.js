const express = require("express");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
} = require("../contollers/productController");
const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middleware/authenticate");
// const isAuthenticate = require("../middleware/authenticate");
const router = express.Router();

router.route("/products").get(isAuthenticatedUser, getProducts);
router
  .route("/product/:product_id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

router
  .route("/review")
  .put(isAuthenticatedUser, createReview)
  .delete(deleteReview);

router.route("/reviews").get(getReviews);

// Admin Route
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, isAuthorizeRoles("admin"), newProduct);

module.exports = router;
