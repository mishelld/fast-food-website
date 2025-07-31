const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

// Get all restaurants
router.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}, "name"); // get just name and _id
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

module.exports = router;
