const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

const Post = require("./models/post");
const Contact = require("./models/contact");

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://Irene:321Pass@cluster0.fquc2.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((response) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({extended: false}));

app.use(express.static('styles'));

app.use(methodOverride('_method'));

app.get('/', (request, response) => {
  const title = "Home";

  response.render(createPath("index"), {title});
});

app.get('/contacts', (request, response) => {
  const title = "Contacts";
  Contact
    .find()
    .then((contacts) => response.render(createPath("contacts"), { title, contacts }))
    .catch((error) => {
      console.log(error);
      response.render(createPath('error'), {title: 'Error'});
    });
});

app.get('/posts/:id', (request, response) => {
  const title = "Post";
  Post
    .findById(request.params.id)
    .then((post) => response.render(createPath("post"), { title, post }))
    .catch((error) => {
      console.log(error);
      response.render(createPath('error'), {title: 'Error'});
    });
});

app.delete('/posts/:id', (request, response) => {
  const title = "Post";
  Post
    .findByIdAndDelete(request.params.id)
    .then((result) => response.sendStatus(200))
    .catch((error) => {
      console.log(error);
      response.render(createPath('error'), {title: 'Error'});
    });
});

app.get('/edit/:id', (request, response) => {
  const title = "Edit Post";
  Post
    .findById(request.params.id)
    .then((post) => response.render(createPath("edit-post"), { title, post }))
    .catch((error) => {
      console.log(error);
      response.render(createPath('error'), {title: 'Error'});
    });
});

app.put('/edit/:id', (request, response) => {
  const {title, author, text} = request.body;
  const {id} = request.params;

  Post
    .findByIdAndUpdate(id, {title, author, text})
    .then(result => response.redirect(`/posts/${id}`))
    .catch((error) => {
      console.log(error);
      response.render(createPath('error'), {title: 'Error'});
    });
});

app.get('/posts', (request, response) => {
  const title = "Posts";
  Post
    .find()
    .sort({createdAt: -1})
    .then((posts) => response.render(createPath("posts"), { title, posts }))
    .catch((error) => {
      console.log(error);
      response.render(createPath('error'), {title: 'Error'});
    });
});

app.post('/add-post', (request, response) => {
  const {title, author, text} = request.body;
  const post = new Post({title, author, text});

  post
    .save()
    .then((result) => response.redirect('/posts'))
    .catch((error) => {
      console.log(error);
      response.render(createPath('error'), {title: 'Error'})
    })
});

app.get('/add-post', (request, response) => {
  const title = "Add post";

  response.render(createPath("add-post"), {title});
});

app.use((request, response) => {
  const title = "Error";

  response
    .status(404)
    .render(createPath('error'), {title});
});