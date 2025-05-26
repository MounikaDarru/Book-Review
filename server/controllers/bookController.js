const Book = require("../models/Book");

// @desc Get all books
// @route GET /api/books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

// @desc Get single book
// @route GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Error fetching book" });
  }
};

// @desc Add new book (admin only for now)
// @route POST /api/books
exports.createBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: "Error creating book" });
  }
};
