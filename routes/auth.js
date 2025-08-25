const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  googleAuth,
} = require('../controllers/authController');

router.get('/authenticateUser', authenticateUser);
router.post('/google-login', googleAuth);

module.exports = router;
