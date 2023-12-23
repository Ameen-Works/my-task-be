// controllers/taskController.js

const Task = require("../../Models/Task");

const addTaskAction = async (req, res) => {
  try {
    // Assuming you have the user ID stored in req.user
    const { title, description, deadline } = req.body;
    const newTask = new Task({
      title,
      description,
      user: req.user._id,
      deadline,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = addTaskAction;
