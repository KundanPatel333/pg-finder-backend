const VisitSchedule = require("../models/VisitSchedule");
const PGListing = require("../models/PGListing");
const generateVisitCode = require("../utils/generateVisitCode");
const { sendVisitCodeNotification } = require("../utils/sendNotification");

const scheduleVisit = async (req, res, next) => {
  try {
    const { pgId, scheduledDate } = req.body;

    const pg = await PGListing.findById(pgId).populate("owner");
    if (!pg) return res.status(404).json({ message: "PG not found" });

    const existing = await VisitSchedule.findOne({
      student: req.user._id,
      pg: pgId,
      status: { $in: ["pending", "confirmed_by_owner"] },
    });
    if (existing) return res.status(400).json({ message: "Active visit already scheduled" });

    const visitCode = generateVisitCode();
    const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

    const visit = await VisitSchedule.create({
      student: req.user._id,
      pg: pgId,
      owner: pg.owner._id,
      visitCode,
      scheduledDate,
      expiresAt,
    });

    await sendVisitCodeNotification(pg.owner.phone, req.user.name, visitCode, scheduledDate);

    res.status(201).json(visit);
  } catch (err) {
    next(err);
  }
};

const confirmVisit = async (req, res, next) => {
  try {
    const { code } = req.body;
    const visit = await VisitSchedule.findOne({ _id: req.params.id, owner: req.user._id });
    if (!visit) return res.status(404).json({ message: "Visit not found" });
    if (visit.visitCode !== code) return res.status(400).json({ message: "Invalid code" });
    if (visit.expiresAt < new Date()) {
      visit.status = "expired";
      await visit.save();
      return res.status(400).json({ message: "Visit code expired" });
    }

    visit.status = "confirmed_by_owner";
    await visit.save();
    res.json(visit);
  } catch (err) {
    next(err);
  }
};

const getMyVisits = async (req, res, next) => {
  try {
    const filter =
      req.user.role === "owner" ? { owner: req.user._id } : { student: req.user._id };
    const visits = await VisitSchedule.find(filter).populate("pg student owner", "name phone");
    res.json(visits);
  } catch (err) {
    next(err);
  }
};

module.exports = { scheduleVisit, confirmVisit, getMyVisits };