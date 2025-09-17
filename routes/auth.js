const express = require("express");
const router = express.Router();
const { authenticateUser, socialAuth, registerUser } = require("../controllers/authController");
const upload = require("../utils/multer");

router.post("/authenticateUser", authenticateUser);
router.post("/social", socialAuth);
router.post("/register", upload.array("pictures", 6), registerUser);

module.exports = router;