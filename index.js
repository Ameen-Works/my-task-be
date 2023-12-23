// server.js

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./Models/User"); // Import the User model
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./Routes/UserRoutes");
const taskRouter = require("./Routes/TaskRoutes");
const Scheduler= require("./Utilities/CheckDeadline");

const app = express();
const port = 3001;

// dotenv.config({ path: "./Config.env" });
dotenv.config();
const dbUrl = process.env.DB_URL;

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/task", taskRouter);

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Your routes go here...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
