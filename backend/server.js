const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("🚀 SocialSphere Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});