const express = require("express");
const router = express.Router();

const {
    createPartner
} = require("../controllers/partnerController");

router.post("/", createPartner);

module.exports = router;