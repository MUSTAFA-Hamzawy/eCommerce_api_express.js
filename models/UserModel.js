const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, "Email is taken."]
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, "Username is taken."]
    },
    phoneNumber: {
        type: String
        },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
}, {
    timestamps: true
})


module.exports = mongoose.model('user', UserSchema);