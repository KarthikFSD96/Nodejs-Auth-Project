const mongoose = require('mongoose');

// Define the User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true // Name is a required field
  },
  email: {
    type: String,
    required: true // Email is a required field
  },
  password: {
    type: String,
    required: true // Password is a required field
  },
  verified: {
    type: Boolean,
    default: false // Verified field with a default value of false
  },
  resetLink: {
    type: String,
    default: '' // Reset link field with a default value of an empty string
  }
}, { timestamps: true }); // Enable timestamps for created and updated dates

// Create a User model using the UserSchema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
