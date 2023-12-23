const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../Models/User"); // Import the User model
const dotenv = require("dotenv");

dotenv.config({ path: "../../Config.env" });
const secretKey = process.env.JWT_SECRET;

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { username: user.username, userId: user._id },
      `${secretKey}`,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({
        token,
        expiresIn: 3600,
        userId: user._id,
        username: user.username,
      });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = loginUser;
