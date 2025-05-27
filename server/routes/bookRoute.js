const express = require("express");
const router = express.Router();
const {
  getBooks,
  searchBooks,
  getBookById,
  createBook
} = require("../controllers/bookController");
const { auth, admin } = require("../middleware/authMiddleware");

router.get("/", getBooks);
router.get("/search", searchBooks);
router.get("/:id", getBookById);
router.post("/", auth, admin, createBook);

module.exports = router;
