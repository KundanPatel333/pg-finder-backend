const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // recipient
    message: { type: String, required: true },
    type: { type: String, enum: ["visit_scheduled", "visit_confirmed"], default: "visit_scheduled" },
    relatedVisit: { type: mongoose.Schema.Types.ObjectId, ref: "VisitSchedule" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);