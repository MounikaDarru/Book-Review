const express = require("express");
const router = express.Router();
const { getReviews, createReview } = require("../controllers/reviewController");
const { auth } = require("../middleware/authMiddleware"); // ✅ FIXED

router.get("/", getReviews);
router.post("/", auth, createReview); // ✅ Now both are functions

module.exports = router;
