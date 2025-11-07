const express = require("express");
const router = express.Router();
const { profileData, profileProfileData, addUserInLoop } = require("../controllers/userDetailsController");

router.post("/profile", profileData)
router.post("/peopleProfile", profileProfileData)
router.post("/addUserLoop", addUserInLoop);

module.exports = router;