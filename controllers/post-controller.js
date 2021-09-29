const Post = require("../models/post");
const createPath = require("../helpers/create-path");

const handleError = (response, error) => {
  console.log(error);
  response.render(createPath('error'), {title: 'Error'});
}

const getPost = (request, response) => {
  const title = "Post";
  Post
    .findById(request.params.id)
    .then((post) => response.render(createPath("post"), { title, post }))
    .catch((error) => handleError(response, error));
};

const deletePost = (request, response) => {
  Post
    .findByIdAndDelete(request.params.id)
    .then((result) => response.sendStatus(200))
    .catch((error) => handleError(response, error));
};

const getEditPost = (request, response) => {
  const title = "Edit Post";
  Post
    .findById(request.params.id)
    .then((post) => response.render(createPath("edit-post"), { title, post }))
    .catch((error) => handleError(response, error));
};

const editPost = (request, response) => {
  const {title, author, text} = request.body;
  const {id} = request.params;

  Post
    .findByIdAndUpdate(id, {title, author, text})
    .then(result => response.redirect(`/posts/${id}`))
    .catch((error) => handleError(response, error));
};

const getPosts = (request, response) => {
  const title = "Posts";
  Post
    .find()
    .sort({createdAt: -1})
    .then((posts) => response.render(createPath("posts"), { title, posts }))
    .catch((error) => handleError(response, error));
};

const addPost = (request, response) => {
  const {title, author, text} = request.body;
  const post = new Post({title, author, text});

  post
    .save()
    .then((result) => response.redirect('/posts'))
    .catch((error) => handleError(response, error));
};

const getAddPost = (request, response) => {
  const title = "Add post";

  response.render(createPath("add-post"), {title});
};

module.exports = {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  addPost,
  getAddPost,
}