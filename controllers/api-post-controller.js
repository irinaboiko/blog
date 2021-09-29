const Post = require("../models/post");

const handleError = (response, error) => {
  response.status(500).send(error.message);
}

const getPosts = (request, response) => {
  Post
      .find()
      .sort({createdAt: -1})
      .then((posts) => response.status(200).json(posts))
      .catch((error) => handleError(response, error));
};

const addPost = (request, response) => {
  const { title, author, text } = request.body;
  const post = new Post({ title, author, text });
  post
      .save()
      .then((post) => response.status(200).json(post))
      .catch((error) => handleError(response, error));
}

const getPost = (request, response) => {
  Post
    .findById(request.params.id)
    .then((post) => response.status(200).json(post))
    .catch((error) => handleError(response, error));
};

const deletePost = (request, response) => {
  Post
    .findByIdAndDelete(request.params.id)
    .then(() => response.status(200).json(request.params.id))
    .catch((error) => handleError(response, error));
};

const editPost = (request, response) => {
  const {title, author, text} = request.body;
  const {id} = request.params;

  Post
    .findByIdAndUpdate(id, {title, author, text}, {new: true})
    .then((post) => response.status(200).json(post))
    .catch((error) => handleError(response, error));
};

module.exports = {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
}