const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const errorMiddleware = require("./middleware/error");

app.use(express.json()); /* Parses the request body as JSON */
app.use(cookieParser()); /* Parses cookies*/

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);

app.use(errorMiddleware);

module.exports = app;
