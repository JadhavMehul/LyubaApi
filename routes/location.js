const express = require("express");
const router = express.Router();
const { getLocation } = require("../controllers/locationController");

router.post("/getLocation", getLocation);

module.exports = router;
