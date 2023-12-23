const Task = require("../../Models/Task");

// Task controller action to delete a specific task
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.user.id;

    // Check if the task exists and belongs to the logged-in user
    const taskToDelete = await Task.findOne({ _id: taskId, user: userId });

    if (!taskToDelete) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Delete the task from the database
    await Task.findByIdAndDelete(taskId);

    // Send a success response
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = deleteTask;
