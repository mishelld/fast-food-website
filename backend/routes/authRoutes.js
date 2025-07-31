const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

// Signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // First, try to find a regular user
    let user = await User.findOne({ email });

    if (user) {
      if (user.password !== password)
        return res.status(400).json({ message: "Invalid password" });

      return res.json({
        message: "Login successful",
        type: "user",
        user: { id: user._id, name: user.name, email: user.email },
      });
    }

    // If not a user, try restaurant
    const restaurant = await Restaurant.findOne({ email });

    if (!restaurant)
      return res.status(400).json({ message: "Account not found" });

    if (restaurant.password !== password)
      return res.status(400).json({ message: "Invalid password" });

    return res.json({
      message: "Login successful",
      type: "restaurant",
      restaurant: {
        id: restaurant._id,
        name: restaurant.name,
        email: restaurant.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
