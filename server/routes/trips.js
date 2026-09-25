const express = require("express");
const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// POST /api/trips
// Create a new trip
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description, rating } =
      req.body;

    const trip = new Trip({
      title,
      destination,
      startDate,
      endDate,
      description,
      rating,
      user: req.userId,
    });

    const savedTrip = await trip.save();

    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create trip",
      error: error.message,
    });
  }
});

// POST /api/trips/:id/upload
// Upload a photo to Cloudinary and attach it to the trip
router.post("/:id/upload", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    const imageUrl = req.file.path;

    trip.photos.push(imageUrl);
    trip.coverImage = imageUrl; 

    const updatedTrip = await trip.save();

    res.status(200).json({
      message: "Photo uploaded successfully",
      trip: updatedTrip,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload photo",
      error: error.message,
    });
  }
});

// GET /api/trips
// Get all trips belonging to the logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trips",
      error: error.message,
    });
  }
});

// GET /api/trips/:id
// Get one trip belonging to the logged-in user
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch trip",
      error: error.message,
    });
  }
});

// PUT /api/trips/:id
// Update a trip belonging to the logged-in user
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description, rating } =
      req.body;

    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    trip.title = title;
    trip.destination = destination;
    trip.startDate = startDate;
    trip.endDate = endDate;
    trip.description = description;
    trip.rating = rating;

    const updatedTrip = await trip.save();

    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update trip",
      error: error.message,
    });
  }
});

// DELETE /api/trips/:id
// Delete a trip belonging to the logged-in user
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete trip",
      error: error.message,
    });
  }
});

module.exports = router;