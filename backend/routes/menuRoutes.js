const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const User = require("../models/User"); // Your user model

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/menu/add", upload.single("image"), async (req, res) => {
  const { name, price, restaurantId, restaurantName } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newItem = new MenuItem({
    name,
    price,
    restaurantId,
    restaurantName,
    imageUrl,
  });

  await newItem.save();
  res.status(201).json({ item: newItem });
});

router.get("/menu", async (req, res) => {
  try {
    const items = await MenuItem.find(); // Get ALL items
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
router.get("/menu/:restaurantId", async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    // Find menu items where restaurantId matches the param
    const items = await MenuItem.find({ restaurantId });

    res.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a menu item by ID
router.delete("/menu/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const item = await MenuItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // 1. Delete the menu item
    await MenuItem.findByIdAndDelete(itemId);

    // 2. Remove the item from every user's cart
    await User.updateMany({}, { $pull: { cart: { itemId: itemId } } });

    res
      .status(200)
      .json({ message: "Item deleted and removed from all carts" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// POST /api/cart/add
router.post("/cart/add", async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ message: "User ID and Item ID are required" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: check if item exists
    const item = await MenuItem.findById(itemId);
    if (!item) return res.status(404).json({ message: "Menu item not found" });

    // Check if item already in cart
    const cartItemIndex = user.cart.findIndex(
      (ci) => ci.itemId.toString() === itemId
    );
    if (cartItemIndex > -1) {
      // Increase quantity
      user.cart[cartItemIndex].quantity += 1;
    } else {
      // Add new item
      user.cart.push({ itemId, quantity: 1 });
    }

    await user.save();

    res.json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/menu/item/:itemId", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching menu item:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get cart for a user
router.get("/cart/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).populate("cart.itemId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.cart); // return just the cart array
  } catch (error) {
    console.error("Error fetching user cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/cart/:userId/:itemId
router.delete("/cart/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    // Remove the cart item with itemId from user's cart array
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { itemId: itemId } } },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Item removed from cart", cart: user.cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
