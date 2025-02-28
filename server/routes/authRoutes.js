const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = authController.auth;

const router = express.Router();

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Get authenticated employee details
router.get('/employeeDetails', authMiddleware, authController.getEmployeeDetails);

module.exports = router;