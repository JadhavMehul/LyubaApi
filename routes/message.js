const express = require("express");
const router = express.Router();
const { sendMessage, getMessages, getChats } = require("../controllers/messageController");


router.post("/sendMessage", sendMessage)
router.post("/getMessage", getMessages)
router.post("/getChats", getChats)

module.exports = router;