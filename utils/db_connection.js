const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const db_connection = mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((err) => {
    console.log("Connection Error", err);
  });

module.exports = db_connection;
