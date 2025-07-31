const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Replace this with your actual database name if needed
const mongoUri =
  "mongodb+srv://mish:mish@cluster0.ydjncln.mongodb.net/test-db?retryWrites=true&w=majority";

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route to confirm server runs
app.get("/", (req, res) => {
  res.send("✅ Server is working and connected to MongoDB!");
});

const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

app.use("/api/auth", authRoutes);
app.use("/api", menuRoutes);
app.use("/api", restaurantRoutes);

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
