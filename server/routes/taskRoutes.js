console.log("TASK ROUTES FILE RUNNING");

const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");

console.log(taskController);

// Test Route
router.get("/test", (req, res) => {
    res.send("Task Route Working");
});

// Add Task
router.post("/add", verifyToken, taskController.addTask);
router.get("/", taskController.getTasks);
router.put("/update/:id", verifyToken, taskController.updateTask);
router.delete("/delete/:id", verifyToken, taskController.deleteTask);
module.exports = router;