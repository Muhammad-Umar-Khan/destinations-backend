const express = require("express");
const router = express.Router();

const AppError = require("../utils/AppError");

router.all("*", (req, res, next) => {
  return next(new AppError(404, "Page Not found"));
});

module.exports = router;
