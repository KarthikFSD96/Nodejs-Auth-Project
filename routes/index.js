// Import required modules
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth');

// Welcome Route
router.get('/', (req, res) => {
    res.render('welcome');
});

// Dashboard Route with Authentication
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dash', {
    name: req.user.name
}));

// Export the Router model
module.exports = router;
