import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    console.log("New signup request received");
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Signup error: User already exists with email", email);
            return res.status(400).json({ msg: "User already exists" })
        };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ firstName, lastName, email, phone, password: hashedPassword });
        console.log("User created:", user);

        res.status(201).json({ msg: "User created successfully", user });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        console.log("Login request received");
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "8h" });

        // Environment-based security settings
        const isProduction = process.env.NODE_ENV === "production";

        // Store token in HttpOnly cookie
        res.cookie("authToken", token, {
            httpOnly: true,                               // JS can’t access this cookie
            secure: isProduction,                         // HTTPS only in production
            sameSite: isProduction ? "None" : "Lax",      // Allow cross-site in prod (for your frontend)
            maxAge: 8 * 60 * 60 * 1000                    // 8 hours
        });
        console.log("User logged in:", user);

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

export default router;
