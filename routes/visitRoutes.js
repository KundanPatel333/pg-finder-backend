const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { scheduleVisitValidation, confirmVisitValidation } = require("../validators/visitValidators");
const { scheduleVisit, confirmVisit, getMyVisits } = require("../controllers/visitController");

router.post("/", protect, authorize("student"), scheduleVisitValidation, validate, scheduleVisit);
router.patch("/:id/confirm", protect, authorize("owner"), confirmVisitValidation, validate, confirmVisit);
router.get("/my", protect, getMyVisits);

module.exports = router;