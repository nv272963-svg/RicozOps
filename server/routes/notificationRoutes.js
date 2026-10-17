const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const notificationController = require("../controllers/notificationController");

console.log("NOTIFICATION ROUTES FILE RUNNING");

router.get("/test", (req, res) => {
    res.send("Notification Route Working");
});

router.post("/add", verifyToken, notificationController.addNotification);

router.get("/", verifyToken, notificationController.getNotifications);

router.delete("/delete/:id", verifyToken, notificationController.deleteNotification);

module.exports = router;