import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user cart
router.get("/", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user }).populate("items.itemId");
    if (!cart) cart = await Cart.create({ userId: req.user, items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Add item to cart
router.post("/add", protect, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user });

    if (!cart) {
      cart = new Cart({ userId: req.user, items: [{ itemId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex((i) => i.itemId.toString() === itemId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ itemId, quantity });
      }
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Remove item from cart
router.delete("/remove/:itemId", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter((i) => i.itemId.toString() !== req.params.itemId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
