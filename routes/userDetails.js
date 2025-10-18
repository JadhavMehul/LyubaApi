const express = require("express");
const router = express.Router();
const { profileData } = require("../controllers/userDetailsController");

router.post("/profile", profileData)

module.exports = router;