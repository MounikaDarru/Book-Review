const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already in use" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
  console.error("Register Error:", err.message);
  res.status(500).json({ error: "Registration failed", message: err.message });
}

};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json("user logged in successfully", { token });
  } catch (err) {
  console.error("Login Error:", err.message);
  res.status(500).json({ error: "Login failed", message: err.message });
}

};
