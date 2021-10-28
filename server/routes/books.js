// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let Book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  Book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  res.render("books/add", { title: "Add book"});
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  let newBook = book({
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });
  Book.create(newBook, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // Refresh the Contact List
      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to details an existing Book
router.get("/details/:id", (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, books) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("books/details", { title: "Book", books});
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("books/details/:id", (req, res, next) => {
  let id = req.params.id;

  let updatedBook = book({
    _id: id,
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });
  Book.updateOne({ _id: id }, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  Book.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
})});

module.exports = router;
