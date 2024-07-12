const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxLength: [100, "product name must be less than 100 characters"],
  },
  price: { type: Number, default: 0.0 },
  description: {
    type: String,
    required: [true, "please enter the product description"],
  },
  ratings: { type: String, default: 0 },
  images: [{ image: { type: String, required: true } }],
  category: {
    type: String,
    required: [true, "please enter product category"],
    enum: {
      values: [
        "Electronics",
        "Mobile Phones",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "books",
        "Clothes/Shoes",
        "beauty/Health",
        "Sports",
        "Outdoors",
        "Home",
      ],
      message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "please enter prodcut seller"],
  },
  stock: {
    type: Number,
    required: [true, "stock field cannot be empty."],
    maxLength: [20, "product stock should not exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: String, required: true },
      comment: { type: String, required: true },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: { type: Date, default: Date.now() },
});

let schema = mongoose.model("Product", productSchema);

module.exports = schema;
