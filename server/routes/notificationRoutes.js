console.log("NOTIFICATION ROUTES FILE RUNNING");
const express = require("express");

const router = express.Router();

const notificationController = require("../controllers/notificationController");

// ==========================================
// GET ALL NOTIFICATIONS
// ==========================================

router.get(
    "/",
    notificationController.getNotifications
);

// ==========================================
// ADD NOTIFICATION
// ==========================================

router.post(
    "/",
    notificationController.addNotification
);

// ==========================================
// UPDATE NOTIFICATION
// ==========================================

router.put(
    "/:id",
    notificationController.updateNotification
);

// ==========================================
// MARK AS READ
// ==========================================

router.put(
    "/read/:id",
    notificationController.markAsRead
);

// ==========================================
// DELETE NOTIFICATION
// ==========================================

router.delete(
    "/:id",
    notificationController.deleteNotification
);

module.exports = router;