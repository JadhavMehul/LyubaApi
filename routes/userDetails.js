const express = require("express");
const router = express.Router();
const { profileData, addUserInLoop, test, peopleProfileData, swypedUser, likedMe } = require("../controllers/userDetailsController");

router.post("/profile", profileData)
router.post("/peopleProfile", peopleProfileData)
router.post("/addUserLoop", addUserInLoop);
router.post("/swypedUser", swypedUser);
router.post("/likedMe", likedMe);
router.post("/test", test);

module.exports = router;