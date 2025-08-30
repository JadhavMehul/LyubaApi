const express = require("express");
const router = express.Router();
const { authenticateUser, socialAuth } = require("../controllers/authController");

router.get("/authenticateUser", authenticateUser);
router.post("/social", socialAuth);

module.exports = router;