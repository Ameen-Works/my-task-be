const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../Models/User"); // Import the User model
const dotenv = require("dotenv");
const { sendEmail } = require("../../Utilities/EmailService");

// dotenv.config({ path: "../../Config.env" });
dotenv.config();
const secretKey = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    const welcomeSubject = "Welcome to My Tasks App";
    const welcomeText =
      "Thank you for registering on My Tasks App from Ameen_Works!";

    await sendEmail(email, welcomeSubject, welcomeText);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registerUser;
