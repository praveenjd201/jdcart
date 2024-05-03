const path = require("path");
// const products = require("../data/products.json");
// const Product = require("../models/productModel");
// const dotenv = require("dotenv");

// using path modle in required function

const products = require(`${path.join(
  path.resolve(),
  "backend/data/products.json"
)}`);
const Product = require(`${path.join(
  path.resolve(),
  "backend/models/productModel"
)}`);
const dotenv = require("dotenv");

const connectDatabase = require("../config/database");
console.log("paths", path.join(path.resolve(), "/data/products.json"));

dotenv.config({ path: path.join(path.resolve(), "backend/config/config.env") });

connectDatabase();

const seedProduct = async () => {
  try {
    await Product.deleteMany();
    console.log("deleted successfully");
    await Product.insertMany(products);
    console.log("Products  added to the database");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
seedProduct();
