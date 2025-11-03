const express = require("express");
const router = express.Router();
const { profileData, profileProfileData } = require("../controllers/userDetailsController");

router.post("/profile", profileData)
router.post("/peopleProfile", profileProfileData)

module.exports = router;