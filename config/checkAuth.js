// Authentication Middleware
module.exports = {
    // Middleware to ensure that the user is authenticated
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        // If not authenticated, flash an error message and redirect to the login page
        req.flash('error_msg', 'Please log in first!');
        res.redirect('/auth/login');
    },

    // Middleware to forward authenticated users to the dashboard
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        // If the user is authenticated, redirect them to the dashboard
        res.redirect('/dashboard');
    }
};
