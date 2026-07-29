const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getPostsByUser,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Create Post
router.post("/", protect, upload.single("image"), createPost);

router.get("/", protect, getAllPosts);

router.get("/user/:userId", protect, getPostsByUser);

router.delete("/:id", protect, deletePost);

router.put("/like/:id", protect, likePost);

router.put("/unlike/:id", protect, unlikePost);

router.post("/comment/:id", protect, addComment);

router.delete(
  "/comment/:postId/:commentId",
  protect,
  deleteComment
);

module.exports = router;