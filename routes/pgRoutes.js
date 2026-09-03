const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { createListingValidation, markInterestValidation } = require("../validators/pgValidators");
const {
  createListing,
  getListings,
  getListingById,
  updateListing,
  markInterest,
  uploadImages,
} = require("../controllers/pgController");

router.get("/", getListings);
router.get("/:id", getListingById);
router.post("/:id/images", protect, authorize("owner"), upload.array("images", 5), uploadImages);
router.post("/", protect, authorize("owner"), createListingValidation, validate, createListing);
router.put("/:id", protect, authorize("owner"), updateListing);
router.post("/:id/interest", protect, authorize("student"), markInterestValidation, validate, markInterest);

module.exports = router;