const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../controllers/authController");

router.get("/authenticateUser", authenticateUser);

module.exports = router;