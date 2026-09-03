const PGListing = require("../models/PGListing");
const Interest = require("../models/Interest");

const createListing = async (req, res, next) => {
  try {
    const listing = await PGListing.create({ ...req.body, owner: req.user._id });
    res.status(201).json(listing);
  } catch (err) {
    next(err);
  }
};

const getListings = async (req, res, next) => {
  try {
    const { minPrice, maxPrice, facilities } = req.query;
    const filter = { isActive: true };

    if (minPrice || maxPrice) {
      filter["priceRange.min"] = {};
      if (minPrice) filter["priceRange.min"].$gte = Number(minPrice);
      if (maxPrice) filter["priceRange.max"] = { $lte: Number(maxPrice) };
    }
    if (facilities) {
      filter.facilities = { $all: facilities.split(",") };
    }

    const listings = await PGListing.find(filter).populate("owner", "name phone");
    res.json(listings);
  } catch (err) {
    next(err);
  }
};

const getListingById = async (req, res, next) => {
  try {
    const listing = await PGListing.findById(req.params.id).populate("owner", "name phone");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    next(err);
  }
};

const updateListing = async (req, res, next) => {
  try {
    const listing = await PGListing.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) {
    next(err);
  }
};

const markInterest = async (req, res, next) => {
  try {
    const interest = await Interest.create({
      student: req.user._id,
      pg: req.params.id,
      notes: req.body.notes,
    });
    await PGListing.findByIdAndUpdate(req.params.id, { $inc: { interestedCount: 1 } });
    res.status(201).json(interest);
  } catch (err) {
    next(err);
  }
};
// POST /api/pg/:id/images (owner only) - upload PG photos
const uploadImages = async (req, res, next) => {
  try {
    const listing = await PGListing.findOne({ _id: req.params.id, owner: req.user._id });
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const imageUrls = req.files.map((file) => file.path);
    listing.images.push(...imageUrls);
    await listing.save();

    res.json({ message: "Images uploaded", images: listing.images });
  } catch (err) {
    next(err);
  }
};

module.exports = { createListing, getListings, getListingById, updateListing, markInterest, uploadImages };