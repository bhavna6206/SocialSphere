const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  followUser,
  unfollowUser,
  searchUsers,
  getUserById,
} = require("../controllers/userController");

// ================= Authentication =================
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

// ================= Logged-in User =================
router.get("/profile", protect, getUserProfile);

// ================= User Profile =================
router.put("/update", protect, updateProfile);

// ================= Follow / Unfollow =================
router.put("/follow/:id", protect, followUser);
router.put("/unfollow/:id", protect, unfollowUser);

// ================= Search Users =================
router.get("/search", protect, searchUsers);

// ================= Get User By ID =================
// Keep this LAST because ":id" can match other routes like "/profile"
router.get("/:id", protect, getUserById);

module.exports = router;