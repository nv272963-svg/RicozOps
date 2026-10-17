const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const settingsController = require("../controllers/settingsController");

// Test
router.get("/test", (req, res) => {
    res.send("Settings Route Working");
});

// Get Settings
router.get("/", verifyToken, settingsController.getSettings);

// Update Profile
router.put("/profile", verifyToken, settingsController.updateProfile);

// Update Company
router.put("/company", verifyToken, settingsController.updateCompany);

// Update Security
router.put("/security", verifyToken, settingsController.updateSecurity);

// Update Appearance
router.put("/appearance", verifyToken, settingsController.updateAppearance);

module.exports = router;