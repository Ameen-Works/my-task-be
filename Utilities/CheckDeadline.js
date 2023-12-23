const cron = require("node-cron");
const { sendEmail } = require("./EmailService");
const Task = require("../Models/Task");
const User = require("../Models/User");

cron.schedule("0 9 * * *", () => {
  // Your logic to check approaching deadlines and send email notifications
  checkApproachingDeadlines(tasks);
});

const checkApproachingDeadlines = async () => {
  try {
    // Assuming you have a Task model with a 'user' field and a 'deadline' field
    const approachingTasks = await Task.find({
      deadline: {
        $gte: new Date(),
        $lt: new Date(new Date().setDate(new Date().getDate() + 3)),
      }, // Tasks with deadlines in the next 3 days
    });

    // Group tasks by user ID
    const tasksByUser = {};
    approachingTasks.forEach((task) => {
      if (!tasksByUser[task.user]) {
        tasksByUser[task.user] = [];
      }
      tasksByUser[task.user].push(task);
    });

    // Send email notifications for each user
    for (const userId in tasksByUser) {
      const userEmail = await getUserEmailById(userId); // Implement a function to get user email by ID
      const userTasks = tasksByUser[userId];

      if (userEmail && userTasks.length > 0) {
        // Create a consolidated list of approaching tasks
        const taskListText = userTasks
          .map(
            (task) =>
              `- ${task.title} (Deadline: ${formatDateString(task.deadline)})`
          )
          .join("\n");

        // Send email notification
        const emailSubject = "Upcoming Task Deadlines";
        const emailText = `Your tasks with approaching deadlines:\n${taskListText}`;

        await sendEmail(userEmail, emailSubject, emailText);
      }
    }
  } catch (error) {
    console.error("Error checking approaching deadlines:", error);
  }
};

const getUserEmailById = async (userId) => {
    try {
      const user = await User.findById(userId);
  
      if (user) {
        return user.email;
      }
  
      // Return null or handle the case where the user is not found
      return null;
    } catch (error) {
      console.error('Error getting user email by ID:', error);
      return null;
    }
  };
