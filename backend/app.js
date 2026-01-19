
import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import User from "./schema.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// JWT CHECK
if (!process.env.JWT_SECRET) {
  console.log("JWT_SECRET missing in .env");
  process.exit(1);
}

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log(err));


//signup route

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    // 1. password match
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2. email exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "Signup successful" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// login route

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "0" }
    );

    //  send token to frontend
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log("server running on port 3000");
});
