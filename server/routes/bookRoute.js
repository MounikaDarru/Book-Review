const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook
} = require("../controllers/bookController");

// GET /api/books
router.get("/", getBooks);

// GET /api/books/:id
router.get("/:id", getBookById);

// POST /api/books
router.post("/", createBook); // Later, add admin auth middleware

module.exports = router;
