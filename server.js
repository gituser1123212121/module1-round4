const express = require("express");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 8080;
const bodyParser = require("body-parser");
const Book = require("./models").book;

//BodyParsing
app.use(bodyParser.json());

const init = () => {
  // add some books to db
  Book.create({
    isbn: "9393029302",
    name: "book1",
    author: "author1",
    publishedOn: "date_published",
    addedOn: "date_added",
  });
  Book.create({
    isbn: "89432924829384",
    name: "book2",
    author: "author1",
    publishedOn: "date_published",
    addedOn: "date_added",
  });
  Book.create({
    isbn: "42940394",
    name: "book3",
    author: "author1",
    publishedOn: "date_published",
    addedOn: "date_added",
  });

  console.log("books have been added to the database");
};

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("tables dropped and recreated");
    init();
  })
  .catch((err) => {
    console.log(err.message);
  });

require("./routes/auth.route")(app);
require("./routes/book.route")(app);

app.listen(PORT, console.log("Server has started at port " + PORT));
