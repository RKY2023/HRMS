const express = require('express');
const leaveController = require('../controllers/leaveController');
const authController = require('../controllers/authController');

const router = express.Router();

// Submit leave request route
router.post('/submit', authController.auth, leaveController.submitLeaveRequest);

module.exports = router;
