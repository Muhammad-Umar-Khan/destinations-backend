const Joi = require("joi");
const AppError = require("../../utils/AppError");

const userValidator = (req, res, next) => {
  const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).required(),
  });
  const { error } = userSchema.validate(req.body);
  if (error) {
    const message = error.details.map((ele) => ele.message).join(",");
    return next(new AppError(422, message));
  }
  next();
};

module.exports = userValidator;
