const express = require("express");
const router = express.Router();

const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middleware/authenticate");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  orders,
  updateOrder,
  deleteOrder,
} = require("../contollers/orderController");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/myorders").get(isAuthenticatedUser, myOrders);

//Admin Routes
router
  .route("/orders")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), orders);
router
  .route("/order/:id")
  .put(isAuthenticatedUser, isAuthorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteOrder);

module.exports = router;
