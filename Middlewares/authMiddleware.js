// middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const dotenv = require("dotenv");

dotenv.config({ path: "../Config.env" });
const secretKey = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  try {
    // Get token from headers
    let authtoken = req.header("Authorization");
    authtoken = authtoken.split(" ");
    const token = authtoken[1];
    console.log(token);
    // Check if token doesn't exist
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, `${secretKey}`);

    // Fetch user from database based on decoded information
    const user = await User.findById(decoded.userId);

    // Check if user doesn't exist
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user to request object
    req.user = user;

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticate;
