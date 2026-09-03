const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const { signupValidation, loginValidation } = require("../validators/authValidators");
const validate = require("../middleware/validate");

router.post("/signup", signupValidation, validate, signup);
router.post("/login", loginValidation, validate, login);

module.exports = router;