console.log("DEPARTMENT ROUTES FILE RUNNING");

const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const departmentController = require("../controllers/departmentController");

console.log(departmentController);

// ================= ROUTES =================

// Test Route
router.get("/test", (req, res) => {
    res.send("Department Route Working");
});

// Add Department
router.post("/add", verifyToken, departmentController.addDepartment);

// Get All Departments
router.get("/", departmentController.getDepartments);
router.put("/update/:id", verifyToken, departmentController.updateDepartment);
router.delete("/delete/:id", verifyToken, departmentController.deleteDepartment);
module.exports = router;