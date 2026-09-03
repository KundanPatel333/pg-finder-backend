const { body } = require("express-validator");

const scheduleVisitValidation = [
  body("pgId").isMongoId().withMessage("Valid PG id is required"),
  body("scheduledDate").isISO8601().withMessage("Valid date is required (e.g. 2026-09-10)"),
];

const confirmVisitValidation = [
  body("code").trim().notEmpty().withMessage("Visit code is required"),
];

module.exports = { scheduleVisitValidation, confirmVisitValidation };