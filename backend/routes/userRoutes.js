const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  logoutUser,
  followUser,
  unfollowUser,
  searchUsers,
  getUserById,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/profile", protect, getUserProfile);

router.put(
  "/profile",
  protect,
  upload.single("profilePic"),
  updateProfile
);

router.put("/follow/:id", protect, followUser);

router.put("/unfollow/:id", protect, unfollowUser);

router.get("/search", protect, searchUsers);

router.get("/:id", protect, getUserById);

// Logout Route
router.post("/logout", logoutUser);

module.exports = router;