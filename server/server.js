const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoute = require('./routes/bookRoute');
const reviewRoute = require('./routes/reviewRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(cors({
  origin: ['http://localhost:3000', 'https://myassignments-bookreview.netlify.app'],
  credentials: true
}));

app.use(express.json());

app.use("/api/books", bookRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// Routes placeholder
app.get("/", (req, res) => {
  res.send("📚 Book Review API is running!");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
});
