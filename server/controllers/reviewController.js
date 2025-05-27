const Review = require("../models/Review");

// GET /api/reviews?bookId=BOOK_ID
exports.getReviews = async (req, res) => {
  try {
    const bookId = req.query.bookId;
    const reviews = await Review.find(bookId ? { book: bookId } : {}).populate('user', 'name');
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};



// POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Basic validation
    if (!rating || !comment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const review = new Review({
      user: req.user.id,
      book: req.body.book,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};



