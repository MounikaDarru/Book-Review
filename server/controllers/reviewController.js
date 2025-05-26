const Review = require("../models/Review");

// GET /api/reviews?bookId=BOOK_ID
exports.getReviews = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const reviews = await Review.find(bookId ? { bookId } : {});
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

// POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const { userId, bookId, rating, comment } = req.body;
    const review = new Review({ userId, bookId, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: "Failed to submit review" });
  }
};
