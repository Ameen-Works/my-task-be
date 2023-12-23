// routes/taskRoutes.js

const express = require("express");
const taskRouter = express.Router();
const addTaskAction = require("../ControllerActions/TaskController/addTask");
const authenticate = require("../Middlewares/authMiddleware");
const getAllTasksForUser = require("../ControllerActions/TaskController/getTask");
const deleteTask = require("../ControllerActions/TaskController/deleteTask");
const editTask = require("../ControllerActions/TaskController/editTask");
const updateTaskCompletionStatus = require("../ControllerActions/TaskController/updateCompletion.js");

taskRouter.post("/add-task", authenticate, addTaskAction);
taskRouter.get("/all-tasks", authenticate, getAllTasksForUser);
taskRouter.delete("/delete/:taskId", authenticate, deleteTask);
taskRouter.put("/edit/:taskId", authenticate, editTask);
taskRouter.patch(
  "/update-complete/:taskId",
  authenticate,
  updateTaskCompletionStatus
);

module.exports = taskRouter;
