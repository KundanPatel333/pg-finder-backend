const User = require("../models/User");
const PGListing = require("../models/PGListing");
const VisitSchedule = require("../models/VisitSchedule");
const Interest = require("../models/Interest");

// GET /api/admin/stats
const getStats = async (req, res, next) => {
  try {
    const [totalStudents, totalOwners, totalPG, totalVisits, confirmedVisits, totalInterests] =
      await Promise.all([
        User.countDocuments({ role: "student" }),
        User.countDocuments({ role: "owner" }),
        PGListing.countDocuments(),
        VisitSchedule.countDocuments(),
        VisitSchedule.countDocuments({ status: "confirmed_by_owner" }),
        Interest.countDocuments(),
      ]);
    res.json({ totalStudents, totalOwners, totalPG, totalVisits, confirmedVisits, totalInterests });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/pg
const getAllListings = async (req, res, next) => {
  try {
    const listings = await PGListing.find()
      .populate("owner", "name email phone")
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/admin/pg/:id
const deleteListing = async (req, res, next) => {
  try {
    const listing = await PGListing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json({ message: "Listing deleted" });
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/visits
const getAllVisits = async (req, res, next) => {
  try {
    const visits = await VisitSchedule.find()
      .populate("student", "name email phone")
      .populate("owner", "name email phone")
      .populate("pg", "name")
      .sort({ createdAt: -1 });
    res.json(visits);
  } catch (err) {
    next(err);
  }
};

// GET /api/admin/pg/:id/visits — all confirmed bookings for one PG, day-wise
const getPgVisits = async (req, res, next) => {
  try {
    const visits = await VisitSchedule.find({
      pg: req.params.id,
      status: "confirmed_by_owner",
    })
      .populate("student", "name email phone")
      .sort({ confirmedAt: -1 });
    res.json(visits);
  } catch (err) {
    next(err);
  }
};

module.exports = { getStats, getAllListings, deleteListing, getAllVisits, getPgVisits };