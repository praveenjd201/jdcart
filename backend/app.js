const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const errorMiddleware = require("./middleware/error");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json()); /* Parses the request body as JSON */
app.use(cookieParser()); /* Parses cookies*/
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // static path

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", payment);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

app.use(errorMiddleware);

module.exports = app;
