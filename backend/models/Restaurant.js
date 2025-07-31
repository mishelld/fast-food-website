const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: false }, // optional for login
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // For simplicity plaintext, but should hash
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
