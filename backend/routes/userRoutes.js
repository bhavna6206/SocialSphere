const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/profile", protect, getUserProfile);

// Logout Route
router.post("/logout", logoutUser);

module.exports = router;