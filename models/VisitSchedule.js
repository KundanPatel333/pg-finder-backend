const mongoose = require("mongoose");

const visitScheduleSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pg: { type: mongoose.Schema.Types.ObjectId, ref: "PGListing", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    visitCode: { type: String, required: true, unique: true },
    scheduledDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed_by_owner", "completed", "expired"],
      default: "pending",
    },
    expiresAt: { type: Date, required: true },
        confirmedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("VisitSchedule", visitScheduleSchema);