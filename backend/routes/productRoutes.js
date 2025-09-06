import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create product (admin feature)
router.post("/", protect, async (req, res) => {
  try {
    const { name, price, category, description, image } = req.body;
    const product = new Product({ name, price, category, description, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all products with filters
router.get("/", async (req, res) => {
  try {
    console.log("Fetching products with filters...");
    const { category, minPrice, maxPrice } = req.query;
    let query = {};
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Update product
router.put("/:id", protect, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Delete product
router.delete("/:id", protect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
