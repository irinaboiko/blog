const express = require("express");
const chalk = require("chalk");
const morgan = require("morgan");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
require('dotenv').config();

const postRouter = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRouter = require('./routes/contact-routes');
const createPath = require("./helpers/create-path");

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((response) => console.log(successMsg('Connected to DB')))
  .catch((error) => console.log(errorMsg(error)));

app.listen(PORT, (error) => {
  error ? console.log(errorMsg(error)) : console.log(successMsg(`Listening on port ${PORT}`));
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
app.use(postApiRoutes);

app.use((request, response) => {
  const title = "Error";

  response
    .status(404)
    .render(createPath('error'), {title});
});