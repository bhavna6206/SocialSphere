const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// ================= Create Post =================
const createPost = async (req, res) => {
  try {
    const { caption } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Post image is required",
      });
    }

    // Upload image to Cloudinary
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "SocialSphere/posts",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    };

    const result = await uploadFromBuffer();

    const post = await Post.create({
      user: req.user._id,
      caption,
      image: result.secure_url,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get All Posts =================
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
    .populate("user", "fullName username profilePic")
    .populate("comments.user", "fullName username profilePic")
    .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get Posts By User =================
const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({
      user: req.params.userId,
    })
      .populate("user", "fullName username profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Delete Post =================
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    // Only owner can delete
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized to delete this post",
      });
    }

    await post.deleteOne();

    res.status(200).json({
      message: "Post deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Like Post =================
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.likes.includes(req.user._id)) {
      return res.status(400).json({
        message: "Post already liked",
      });
    }

    post.likes.push(req.user._id);

    await post.save();

    res.status(200).json({
      message: "Post liked successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Unlike Post =================
const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!post.likes.includes(req.user._id)) {
      return res.status(400).json({
        message: "Post is not liked yet",
      });
    }

    post.likes = post.likes.filter(
      (userId) => userId.toString() !== req.user._id.toString()
    );

    await post.save();

    res.status(200).json({
      message: "Post unliked successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Add Comment =================
const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        message: "Comment cannot be empty",
      });
    }

    post.comments.push({
      user: req.user._id,
      text,
    });

    await post.save();

    res.status(200).json({
      message: "Comment added successfully",
      comments: post.comments,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Delete Comment =================
const deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized to delete this comment",
      });
    }

    comment.deleteOne();

    await post.save();

    res.status(200).json({
      message: "Comment deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsByUser,
  deletePost,
  likePost,
  unlikePost,
  addComment,
  deleteComment,
};