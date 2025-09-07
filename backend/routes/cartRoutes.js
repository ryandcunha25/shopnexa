import express from "express";
import Cart from "../models/Cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user cart
router.get("/", protect, async (req, res) => {
  console.log("Fetching cart for user:", req.user);
  try {
    let cart = await Cart.findOne({ userId: req.user })
      .populate("products.productId");

    console.log("Cart found:", cart);

    if (!cart) {
      console.log("No cart found, creating a new one.");
      cart = await Cart.create({ userId: req.user, products: [] });
    }

    const cartItems = cart.products
      .filter(item => item.productId) 
      .map(item => ({
        _id: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        category: item.productId.category,
        description: item.productId.description,
        image: item.productId.image,
        ratings: item.productId.ratings,
        inStock: item.productId.inStock,
        quantity: item.quantity,
        addedToCart: item.createdAt
      }));

    res.status(200).json({
      success: true,
      items: cartItems,
      cartId: cart._id,
    });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ msg: err.message });
  }
});


// Add product to cart
router.post("/add", protect, async (req, res) => {
    console.log("Adding an product to cart for user:", req.user);
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user });

        if (!cart) {
            cart = new Cart({ userId: req.user, products: [{ productId, quantity }] });
        } else {
            const productIndex = cart.products.findIndex((i) => i.productId.toString() === productId);
            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Remove product from cart
router.delete("/remove/:productId", protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user });
        if (!cart) return res.status(404).json({ msg: "Cart not found" });

        cart.products = cart.products.filter((i) => i.productId.toString() !== req.params.productId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

export default router;


