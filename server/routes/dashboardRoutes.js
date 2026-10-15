const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

console.log("dashboardRoutes Loaded");

// Test Route
router.get("/stats", verifyToken, dashboardController.getDashboardStats);
router.get("/analytics", verifyToken, dashboardController.getDashboardAnalytics);
router.get(
    "/activities",
    verifyToken,
    dashboardController.getRecentActivities
);
// Root Route
router.get("/", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Dashboard Route Working"
    });
});

module.exports = router;