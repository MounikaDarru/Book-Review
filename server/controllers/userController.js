const User = require("../models/User");

// GET /api/users/:id
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// PUT /api/users/:id
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio },
      { new: true }
    ).select("-password");
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: "Failed to update user" });
  }
};
