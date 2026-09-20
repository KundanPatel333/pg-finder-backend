const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");

const { getStats, getAllListings, deleteListing, getAllVisits, getPgVisits } = require("../controllers/adminController");

router.use(protect, authorize("admin"));

router.get("/stats", getStats);
router.get("/pg", getAllListings);
router.delete("/pg/:id", deleteListing);
router.get("/visits", getAllVisits);
router.get("/pg/:id/visits", getPgVisits);

module.exports = router;