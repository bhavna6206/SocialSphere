const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostsByUser,
  deletePost,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create Post
router.post("/", protect, upload.single("image"), createPost);

router.get("/", protect, getAllPosts);

router.get("/user/:userId", protect, getPostsByUser);

router.delete("/:id", protect, deletePost);

module.exports = router;