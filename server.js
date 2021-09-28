const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

const postRouter = require('./routes/post-routes');
const contactRouter = require('./routes/contact-routes');
const createPath = require("./helpers/create-path");

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;
const db = 'mongodb+srv://Irene:321Pass@cluster0.fquc2.mongodb.net/node-blog?retryWrites=true&w=majority';

mongoose
  .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((response) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

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

app.use(postRouter);
app.use(contactRouter);

app.use((request, response) => {
  const title = "Error";

  response
    .status(404)
    .render(createPath('error'), {title});
});