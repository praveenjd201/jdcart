const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAysncError");
const ApiFeatures = require("../utils/apiFeatures");

// get products  --  /api/v1/products
exports.getProducts = async (req, res, next) => {
  const resPerPage = 4;
  // const apiFeatures = new ApiFeatures(Product.find(), req.query)
  //   .search()
  //   .filter()
  //   .paginate(resPerPage);   no more need on this line

  let buildQuery = () => {
    return new ApiFeatures(Product.find(), req.query).search().filter();
  };

  const filteredProductCount = await buildQuery().query.countDocuments({});
  const totalProductsCount = await Product.countDocuments({}); // to get total number of products in database
  // await new Promise((resolve) => setTimeout(resolve, 3000)); // createing delay while fething data through api
  // return next(new ErrorHandler(400, "unable to send the products")); // to check error throung tostify
  let productCount = totalProductsCount;
  if (filteredProductCount !== totalProductsCount) {
    productCount = filteredProductCount;
  }
  const products = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: productCount,
    resPerPage,
    products,
  });
};

// create product  --  /api/v1/product/new

exports.newProduct = catchAsyncError(async (req, res, next) => {
  let images = [];

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }
  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/products/${file.originalname}`;
      images.push({ image: url });
    });
  }
  req.body.images = images;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// get single product  --  /api/v1/prodcuct/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.product_id).populate(
    "reviews.user",
    "name email"
  );
  if (!product) {
    return next(new ErrorHandler(404, "Product not found!"));
  }
  // await new Promise((resolve) => setTimeout(resolve, 3000)); // creating delay while fething data through api
  res.status(201).json({
    sucess: true,
    product,
  });
});

// update product  --  /api/v1/prodcuct/:id

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  let images = [];

  // ------------ It keeps the existing images--------------------------
  if (req.body.imagesCleared === "false") {
    images = product.images;
  }

  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get("host")}`;
  }

  if (req.files.length > 0) {
    req.files.forEach((file) => {
      let url = `${BASE_URL}/uploads/products/${file.originalname}`;
      images.push({ image: url });
    });
  }
  req.body.images = images;
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "The product you are trying to update does not exist.",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //return the updated user
    runValidators: true, //validate fields even if they haven't changed
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// delete product  --  /api/v1/prodcuct/:id

exports.deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(400)
      .json({ success: false, message: "This product is not available" });
  }
  product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
};

// create Review  - /api/v1/review
exports.createReview = catchAsyncError(async (req, res, next) => {
  const { productId, rating, comment } = req.body;
  const review = {
    user: req.user.id,
    rating,
    comment,
  };
  const product = await Product.findById(productId);
  //finding user review is exist or not
  const isReviewed = product.reviews.find((review) => {
    // using find method beacuse the find method return the truthy value when the array value satisfied
    return review.user.toString() == req.user.id.toString();
  });

  if (isReviewed) {
    // updating review
    product.reviews.forEach((review) => {
      if (review.user.toString() == req.user.id) {
        review.rating = rating;
        review.comment = comment;
      }
    });
  } else {
    // creating the review
    product.reviews.push(review);
  }
  product.numOfReviews = product.reviews.length;
  // find the average of the product reviews
  product.ratings =
    product.reviews.reduce((accumlator, review) => {
      return Number(review.rating) + accumlator;
    }, 0) / product.reviews.length;

  product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get Review  - /api/v1/reviews?id={prodcutId}
exports.getReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id).populate(
    "reviews.user",
    "name email"
  );
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review  - /api/v1/review?id={reviewId}&productid={prodcutId}
exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  // filtering the reviews which does not match the deleting review id
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });
  // console.log(reviews.length);
  // numer of review updating
  const numOfReviews = reviews.length;
  //finding the average with filtered reveiws
  let ratings =
    reviews.reduce((accumlator, review) => {
      return review.rating + accumlator;
    }, 0) / reviews.length;

  ratings = isNaN(ratings) ? 0 : ratings;
  // save or update the product document
  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings,
  });
  res.status(200).json({
    success: true,
  });
});

// Admin get products - /api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
