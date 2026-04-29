const express = require("express");
const router = express.Router();
const { profileData, addUserInLoop, test, peopleProfileData, swypedUser, likedMe, matched, editProfileData } = require("../controllers/userDetailsController");

router.post("/profile", profileData)
router.put("/editProfile", editProfileData)
router.post("/peopleProfile", peopleProfileData)
router.post("/addUserLoop", addUserInLoop);
router.post("/swypedUser", swypedUser);
router.post("/likedMe", likedMe);
router.post("/matched", matched);
router.post("/test", test);

module.exports = router;