const { body } = require("express-validator");

const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("phone")
    .matches(/^\+?[0-9]{10,13}$/)
    .withMessage("Valid phone number is required"),
  body("role").isIn(["student", "owner"]).withMessage("Role must be student or owner"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { signupValidation, loginValidation };