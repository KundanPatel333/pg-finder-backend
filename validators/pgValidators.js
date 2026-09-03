const { body } = require("express-validator");

const createListingValidation = [
  body("name").trim().notEmpty().withMessage("PG name is required"),
  body("address").trim().notEmpty().withMessage("Address is required"),
  body("priceRange.min").isNumeric().withMessage("Minimum price must be a number"),
  body("priceRange.max").isNumeric().withMessage("Maximum price must be a number"),
  body("facilities").optional().isArray().withMessage("Facilities must be a list"),
];

const markInterestValidation = [
  body("notes").optional().trim().isLength({ max: 500 }).withMessage("Notes too long (max 500 chars)"),
];

module.exports = { createListingValidation, markInterestValidation };