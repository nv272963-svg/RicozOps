const express = require("express");

const router = express.Router();

const settingsController = require("../controllers/settingsController");

// ==============================
// GET SETTINGS
// ==============================

router.get("/", settingsController.getSettings);

// ==============================
// UPDATE PROFILE
// ==============================

router.put("/profile", settingsController.updateProfile);

// ==============================
// UPDATE COMPANY
// ==============================

router.put("/company", settingsController.updateCompany);
// ==============================
// UPDATE SECURITY
// ==============================

router.put("/security", settingsController.updateSecurity);
// ==============================
// UPDATE APPEARANCE
// ==============================

router.put("/appearance", settingsController.updateAppearance);
module.exports = router;