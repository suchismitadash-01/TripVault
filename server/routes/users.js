const express = require("express");
const User = require("../models/User");
const Trip = require("../models/Trip");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/users/:username/profile
// @desc    Get a public user profile
// @access  Public
router.get("/:username/profile", async (req, res) => {
  try {
    const username = req.params.username.toLowerCase();

    const user = await User.findOne({ username }).select(
      "name username bio"
    );

    if (!user) {
      return res.status(404).json({
        message: "User profile not found",
      });
    }

    const trips = await Trip.find({ user: user._id }).select(
      "title destination startDate endDate rating coverImage"
    );

    return res.status(200).json({
      username: user.username,
      name: user.name,
      bio: user.bio,
      trips,
    });
  } catch (err) {
    console.error("Public profile error:", err.message);

    return res.status(500).json({
      message: "Server error while fetching profile",
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update logged-in user's profile
// @access  Private
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { username, bio } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username is required",
      });
    }

    const cleanUsername = username.trim().toLowerCase();

    const existingUser = await User.findOne({
      username: cleanUsername,
      _id: { $ne: req.userId },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "This username is already taken",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        username: cleanUsername,
        bio: bio ? bio.trim() : "",
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update profile error:", err.message);

    return res.status(500).json({
      message: "Server error while updating profile",
    });
  }
});

module.exports = router;