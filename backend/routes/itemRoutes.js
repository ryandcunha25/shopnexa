import express from "express";
import Item from "../models/Item.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create item (admin feature)
router.post("/", protect, async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;
    const item = new Item({ name, price, category, description, image });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all items with filters
router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    let query = {};
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const items = await Item.find(query);
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update item
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete item
router.delete("/:id", protect, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ msg: "Item deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
