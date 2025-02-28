const express = require('express');
const leaveController = require('../controllers/leaveController');
const authController = require('../controllers/authController');

const router = express.Router();

// Submit leave request route
router.post('/submit', authController.auth, leaveController.submitLeaveRequest);

// Get upcoming leaves route
router.get('/upcoming', authController.auth, leaveController.getUpcomingLeaves);

// Get all leaves route
router.get('/all', authController.auth, leaveController.getAllLeaves);

module.exports = router;
