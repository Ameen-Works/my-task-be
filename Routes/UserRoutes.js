const express = require("express");
const registerUser = require("../ControllerActions/User/Register");
const loginUser = require("../ControllerActions/User/Login");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);


module.exports = userRouter;
