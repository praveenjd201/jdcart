const catchAsyncError = require("../middleware/catchAysncError");
const OrderModel = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
// create new order   -   /api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemPrice,
    taxprice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await OrderModel.create({
    orderItems,
    shippingInfo,
    itemPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user.id,
  });
  res.status(200).json({
    success: true,
    order,
  });
});

// Get single order   -   /api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`order not found with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get loggedin user order   -   /api/v1/myorder
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find({ user: req.user.id });
  res.status(200).json({
    success: true,
    orders,
  });
});

// Admin : GEet all orders   -   /api/v1/orders
exports.orders = catchAsyncError(async (req, res, next) => {
  const orders = await OrderModel.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Admin : Update order / order status   -   /api/v1/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  // Checking the order is delivered  or not
  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler(400, "Cannot update a delivered order"));
  }
  // update the orderstatus and product quantity
  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });
  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();
  res.status(200).json({
    success: true,
  });
});
// ---- function for updating stocks after an order is placed or cancel
async function updateStock(prductId, quantity) {
  const product = await Product.findById(prductId);
  // Decrease the stock of that particular product by the ordered quantity
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Admin : Delete Order   -   /api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler(400, "No Order found with this id"));
  }
  await OrderModel.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "order deleted successfully",
  });
});
