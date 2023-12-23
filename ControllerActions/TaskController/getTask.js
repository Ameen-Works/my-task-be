// Task controller action to get all tasks for a specific user
const Task = require("../../Models/Task");

const getAllTasksForUser = async (req, res) => {
    try {
      // Assuming you have a Task model and the user ID is stored in the request after authentication
      const userId = req.user.id;
  
      // Retrieve all tasks for the specific user from the database
      const tasks = await Task.find({ user: userId });
  
      // Send the tasks as a JSON response
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  module.exports =  getAllTasksForUser ;
  