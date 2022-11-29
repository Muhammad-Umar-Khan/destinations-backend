const Joi = require("joi");
const AppError = require("../../utils/AppError");

const placeValidator = (req, res, next) => {
  const placeSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    address: Joi.string().required(),
    creator: Joi.string().alphanum().required(),
  });
  const { error } = placeSchema.validate(req.body);
  if (error) {
    const message = error.details.map((e) => e.message).join(",");
    return next(new AppError(422, message));
  }
  next();
};

module.exports = placeValidator;
