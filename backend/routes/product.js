const express = require("express");

const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/products"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createReview,
  getReviews,
  deleteReview,
  getAdminProducts,
} = require("../contollers/productController");
const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middleware/authenticate");
// const isAuthenticate = require("../middleware/authenticate");
const router = express.Router();

router.route("/products").get(getProducts); // removed the parameter "isAuthenticatedUser"
router.route("/product/:product_id").get(getSingleProduct);

router.route("/review").put(isAuthenticatedUser, createReview);

// Admin Route
router
  .route("/admin/product/new")
  .post(
    isAuthenticatedUser,
    isAuthorizeRoles("admin"),
    upload.array("images"),
    newProduct
  );
router
  .route("/admin/products")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteProduct)
  .put(
    isAuthenticatedUser,
    isAuthorizeRoles("admin"),
    upload.array("images"),
    updateProduct
  );
router
  .route("/admin/reviews")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getReviews)
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteReview);

module.exports = router;
