// Import required modules
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Import the User model
const User = require('../models/User');

module.exports = function (passport) {
    // Configure Passport for local strategy
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // User Matching
            User.findOne({
                email: email
            }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'This email ID is not registered' });
                }

                // Password Matching
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Password incorrect! Please try again.' });
                    }
                });
            });
        })
    );

    // Serialize user
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // Deserialize user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
