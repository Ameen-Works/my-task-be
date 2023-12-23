
const Task = require("../../Models/Task");

const updateTaskCompletionStatus = async (req, res) => {
  const taskId = req.params.taskId;
  const { completed } = req.body;

  try {
    // Update the completion status of the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed },
      { new: true } // To get the updated task as the result
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task completion status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = updateTaskCompletionStatus;
