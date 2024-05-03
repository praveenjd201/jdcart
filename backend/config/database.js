const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`MongoDB is connected to the host:${con.connection.host}`);
    });
  // .catch((err) => {
  //   console.log(err);   // will caught as unhandled rejection error  so we need to handle this and have to shutdown the server.
  // });
};

module.exports = connectDatabase;
