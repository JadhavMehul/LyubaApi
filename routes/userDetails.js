const express = require("express");
const router = express.Router();
const { profileData, profileProfileData, addUserInLoop, test } = require("../controllers/userDetailsController");

router.post("/profile", profileData)
router.post("/peopleProfile", profileProfileData)
router.post("/addUserLoop", addUserInLoop);
router.post("/test", test);

module.exports = router;