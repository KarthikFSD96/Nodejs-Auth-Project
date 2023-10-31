// Import required modules
const express = require('express');
const router = express.Router();

// Import Controllers from authController
const authController = require('../controllers/authController');

// Define the Login Route
router.get('/login', (req, res) => res.render('login'));

// Define the Forgot Password Route
router.get('/forgot', (req, res) => res.render('forgot'));

// Define the Reset Password Route
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id });
});

// Define the Register Route
router.get('/register', (req, res) => res.render('register'));

// Handle POST requests for user registration
router.post('/register', authController.registerHandle);

// Handle GET requests for email activation
router.get('/activate/:token', authController.activateHandle);

// Handle POST requests for forgot password functionality
router.post('/forgot', authController.forgotPassword);

// Handle POST requests for resetting the password
router.post('/reset/:id', authController.resetPassword);

// Handle GET requests to go to the password reset page
router.get('/forgot/:token', authController.gotoReset);

// Handle POST requests for user login
router.post('/login', authController.loginHandle);

// Handle GET requests for user logout
router.get('/logout', authController.logoutHandle);

// Export the Router model
module.exports = router;
