const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./config/database");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

connectDatabase();

let server = app.listen(process.env.PORT, (req) => {
  // console.log("path", path.join(path.resolve(), "/config"));
  console.log(
    `My server is listening to the port ${process.env.PORT} and ${process.env.NODE_ENV}`
  );
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shutting down the server due to unhandledRejection error");
  server.close(() => {
    process.exit();
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("shutting down the server due to uncaughtException error");
  server.close(() => {
    process.exit();
  });
});
