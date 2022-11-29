const express = require("express");
const router = express.Router();
const validateUser = require("../middlewares/validation/user-validator");
const loginValidate = require("../middlewares/validation/login-validator");

const userControllers = require("../controllers/user-controllers");

router.get("/", userControllers.getUsers);
router.post("/signup", validateUser, userControllers.register);
router.post("/login", loginValidate, userControllers.login);

module.exports = router;
