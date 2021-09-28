const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.get('/', (request, response) => {
  const title = "Home";

  response.render(createPath("index"), {title});
});

app.get('/contacts', (request, response) => {
  const title = "Contacts";
  const contacts = [
    {name: 'YouTube', link: "http://youtube.com/YauhenKavalchuk"},
    {name: 'GitHub', link: "http://github.com/YauhenKavalchuk"},
    {name: 'Twitter', link: "http://twitter.com/YauhenKavalchuk"},
  ];

  response.render(createPath("contacts"), { contacts, title });
});

app.get('/posts/:id', (request, response) => {
  const title = "Post";

  response.render(createPath("post"), {title});
});

app.get('/posts', (request, response) => {
  const title = "Posts";

  response.render(createPath("posts"), {title});
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