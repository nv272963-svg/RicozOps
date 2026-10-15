console.log("ATTENDANCE ROUTES FILE RUNNING");

const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const attendanceController = require("../controllers/attendanceController");

console.log(attendanceController);

// Test Route
router.get("/test", (req, res) => {
    res.send("Attendance Route Working");
});

// Add Attendance
router.post("/add", verifyToken, attendanceController.addAttendance);

router.get("/", verifyToken, attendanceController.getAttendance);

router.put("/update/:id", verifyToken, attendanceController.updateAttendance);

router.delete("/delete/:id", verifyToken, attendanceController.deleteAttendance);
module.exports = router;