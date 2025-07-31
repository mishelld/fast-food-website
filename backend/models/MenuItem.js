const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
  restaurantName: { type: String, required: true },
  imageUrl: { type: String }, // <-- add this line
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

module.exports = MenuItem;
