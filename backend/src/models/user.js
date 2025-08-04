const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
    firstName: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 14,
    },
    lastName: {
        type: String,
    },
    avatar: {
        type: String,
        default: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
    },
    lastSeen: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default:false,
    },
      status: {
        type: String,
        default: 'Hey there! I\'m using Nexconnect',
        maxlength: 100
    },

}, { Timestamp: true })

const User = mongoose.model("user", userSchema)
module.exports = User