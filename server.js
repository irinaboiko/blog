const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`Listening on port ${PORT}`);
});

app.get('/', (request, response) => {
  response.sendFile(createPath("index"));
});

app.get('/contacts', (request, response) => {
  response.sendFile(createPath("contacts"));
});

app.get('/about-us', (request, response) => {
  response.redirect("contacts");
});

app.use((request, response) => {
  response
    .status(404)
    .sendFile(createPath('error'));
});