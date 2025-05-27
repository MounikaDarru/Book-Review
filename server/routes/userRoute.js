const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile
} = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

router.get('/profile', auth, getUserProfile);
router.put('/:id', auth, updateUserProfile);


module.exports = router;
