const Task = require("../../Models/Task");
const { sendEmail } = require("../../Utilities/EmailService");

// Task controller action to edit/update a specific task
const editTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.user.id;

    // Check if the task exists and belongs to the logged-in user
    const taskToUpdate = await Task.findOne({ _id: taskId, user: userId });

    if (!taskToUpdate) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Extract updated task details from the request body
    const { title, description, deadline } = req.body;

    // Update the task details
    taskToUpdate.title = title;
    taskToUpdate.description = description;
    taskToUpdate.deadline = deadline;

    // Save the updated task to the database
    await taskToUpdate.save();
    const subject=` Task Edited: ${taskToUpdate.title}`;
    const message=` Your task has been updated successfully:  ${taskToUpdate.title}`
        await sendEmail(req.user.email,subject,message)
    // Send the updated task as a response
    res.json({ message: 'Task updated successfully', task: taskToUpdate });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = editTask ;
