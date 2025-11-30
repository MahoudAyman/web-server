import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URL = process.env.MONGO_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

const app = express();
app.use(express.json());
app.use(cors());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend")));

// ====== MongoDB Connection ======
mongoose.connect(MONGO_URL, { })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err.message));

// ====== User Model ======
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// ====== Register (Sign Up) ======
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password) return res.json({ status: "error", message: "All fields required" });

        const exists = await User.findOne({ email });
        if (exists) return res.json({ status: "error", message: "Email already exists" });

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hash
        });

        await newUser.save();

        res.json({ status: "success", message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

// ====== Login ======
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) return res.json({ status: "error", message: "All fields required" });

        const user = await User.findOne({ email });
        if (!user) return res.json({ status: "error", message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.json({ status: "error", message: "Wrong password" });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

        res.json({
            status: "success",
            message: "Logged in successfully",
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

// ====== Protected Route Example ======
app.get("/profile", async (req, res) => {
    try {
        const auth = req.headers.authorization;
        const token = auth?.split(" ")[1];
        if (!token) return res.status(401).json({ status: "error", message: "No token" });

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user) return res.status(404).json({ status: "error", message: "User not found" });

        res.json({ status: "success", user });
    } catch (err) {
        console.error(err);
        res.status(401).json({ status: "error", message: "Invalid token" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
