const express = require("express");
const router = express.Router();
const { authenticateUser, socialAuth } = require("../controllers/authController");

router.post("/authenticateUser", authenticateUser);
router.post("/social", socialAuth);

module.exports = router;