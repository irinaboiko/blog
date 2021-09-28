const Contact = require("../models/contact");
const createPath = require("../helpers/create-path");

const getContacts = (request, response) => {
  const title = "Contacts";
  Contact
    .find()
    .then((contacts) => response.render(createPath("contacts"), { title, contacts }))
    .catch((error) => {
      console.log(error);
      response.render(createPath('error'), {title: 'Error'});
    });
}

module.exports = {
  getContacts
}