const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: false }, // optional for login
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // For simplicity plaintext, but should hash
  // Cart stores array of item references or objects
  cart: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
      quantity: { type: Number, default: 1 },
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
