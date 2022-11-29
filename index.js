if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");

const placeRoutes = require("./routes/place-routes");
const userRoutes = require("./routes/user-routes");
const notFoundRoutes = require("./routes/not-found");
const db_connection = require("./utils/db_connection");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db_connection; //connect with database;

app.use("/", userRoutes);
app.use("/api/places", placeRoutes);
app.use(notFoundRoutes);

app.use((err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res
    .status(err.code || 500)
    .json({ message: err.message || "Internal server error ):" });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
