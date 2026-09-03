const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pg: { type: mongoose.Schema.Types.ObjectId, ref: "PGListing", required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ["interested", "visited", "confirmed"],
      default: "interested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interest", interestSchema);