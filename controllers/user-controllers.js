const AppError = require("../utils/AppError");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) {
      return next(new AppError(400, "No User exist"));
    }
    return res.status(200).json(users);
  } catch (error) {
    return next(new AppError());
  }
};

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    return next(new AppError(409, "A user with this email already exist"));
  }
  try {
    const hashed = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashed,
    });

    const token = jwt.sign({ user: user._id, expiresIn: "24h" }, secret);
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", newUser, token: token });
  } catch (error) {
    return next(new AppError(400, "Could't register, try again"));
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new AppError(404, "User does not exist"));
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return next(new AppError(400, "Credential failed"));
    }
    const token = jwt.sign({ user: user._id, expiresIn: "24h" }, secret);
    return res.status(200).json({
      message: "Logged in successful",
      user: user,
      token: token,
    });
  } catch (error) {
    return next(new AppError(500, "Internal server error"));
  }
};

module.exports = { register, login, getUsers };
