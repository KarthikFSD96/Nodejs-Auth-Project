// Import required modules
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();

// Passport Configuration: Initialize Passport for authentication
require('./config/passport')(passport);

// DB Configuration: MongoDB connection string
const db = 'mongodb+srv://karthikrajuml:IAm%40MongoDB1996@clustednodejs.jmd7dtq.mongodb.net/';

// Mongo Connection: Connect to MongoDB database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

// EJS Configuration: Set up EJS for rendering views
app.use(expressLayouts);
app.use("/assets", express.static('./assets')); // Serve static assets from the 'assets' directory
app.set('view engine', 'ejs');

// Bodyparser Configuration: Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: false }))

// Express session Configuration: Set up sessions with a secret
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// Passport Middlewares: Initialize Passport and manage user sessions
app.use(passport.initialize());
app.use(passport.session());

// Connecting flash: Use connect-flash for displaying flash messages
app.use(flash());

// Global variables: Set global variables for success and error messages
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes: Define and use routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

// Define the port for the server
const PORT = process.env.PORT || 6900;

// Start the server and listen on the specified port
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));
