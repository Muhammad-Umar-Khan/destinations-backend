const jwt = require("jsonwebtoken");
const AppError = require("../../utils/AppError");
const secret = process.env.JWT_SECRET;

const isLoggedIn = (req, res, next) => {
  const { token } = req.get("authorization");
  const verify = jwt.verify(token, secret);
  if (verify) {
    return next();
  }
  return next(new AppError(401, "Please Login"));
};

module.exports = isLoggedIn;
