const express = require("express");
const router = express.Router();

const {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost
} = require("../controllers/api-post-controller");

// Get All Posts
router.get('/api/posts', getPosts);

// Add New Post
router.post('/api/post', addPost);

//Get Post By ID
router.get('/api/post/:id', getPost);

//Delete Post By ID
router.delete('/api/post/:id', deletePost);

//Edit Post By ID
router.put('/api/post/:id', editPost);

module.exports = router;