const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profilePicture: {
        type: String,  // This will store the URL of the profile picture
        default: '',   // Optional: default to an empty string if no profile picture is provided
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
