console.log("PROJECT ROUTES FILE RUNNING");

const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const projectController = require("../controllers/projectController");

console.log(projectController);

// Test Route
router.get("/test", (req, res) => {
    res.send("Project Route Working");
});

// Add Project
router.post("/add", verifyToken, projectController.addProject);

// Get Projects
router.get("/", projectController.getProjects);
router.put("/update/:id", verifyToken, projectController.updateProject);
router.delete("/delete/:id", verifyToken, projectController.deleteProject);
module.exports = router;