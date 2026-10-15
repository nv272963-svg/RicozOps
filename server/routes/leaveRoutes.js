const express = require("express");
const router = express.Router();

console.log("LEAVE ROUTES FILE RUNNING");

const leaveController = require("../controllers/leaveController");

console.log(leaveController);

// ================= ADD LEAVE =================
router.post("/add", leaveController.addLeave);
router.get("/", leaveController.getLeaves);
router.put("/update/:id", leaveController.updateLeave);
router.delete("/delete/:id", leaveController.deleteLeave);
router.put("/approve/:id", leaveController.approveLeave);
module.exports = router;