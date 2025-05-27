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

exports.searchBooks = async (req, res) => {
  try {
    const query = req.query.q || "";
    const regex = new RegExp(query, "i"); // case-insensitive

    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex },
        { description: regex }
      ]
    });

    res.json(books);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Failed to search books" });
  }
};

// @desc Get single book
// @route GET /api/books/:id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book", message: err.message });
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
