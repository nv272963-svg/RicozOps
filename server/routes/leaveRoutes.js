const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const leaveController = require("../controllers/leaveController");

// Test
router.get("/test", (req, res) => {
    res.send("Leave Route Working");
});

// Add Leave
router.post("/add", verifyToken, leaveController.addLeave);

// Get Leaves
router.get("/", verifyToken, leaveController.getLeaves);

// Update Leave
router.put("/update/:id", verifyToken, leaveController.updateLeave);

// Delete Leave
router.delete("/delete/:id", verifyToken, leaveController.deleteLeave);

// Approve / Reject Leave
router.put("/approve/:id", verifyToken, leaveController.approveLeave);

module.exports = router;