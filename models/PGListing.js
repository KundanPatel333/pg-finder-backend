const mongoose = require("mongoose");

const pgListingSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: String,
    address: { type: String, required: true },
    location: {
      lat: Number,
      lng: Number,
    },
    priceRange: {
      min: Number,
      max: Number,
    },
    facilities: [String],
    images: [String],
    videos: [String],
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    interestedCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PGListing", pgListingSchema);