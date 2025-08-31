const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 14,
    },
    lastName: {
        type: String,
    },
    avatar: {
        type: String,
        default: "", 
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String, 
    },
    googleId: {
        type: String, 
    },
    lastSeen: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: "Hey there! I'm using Nexconnect",
        maxlength: 100,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    // Friend System
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    friendRequests: [
        {
            sender: { type: Schema.Types.ObjectId, ref: "user" },
            status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
            sentAt: { type: Date, default: Date.now }
        }
    ],

    // Blocked Users
    blockedUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    ],

    // AI Features & Preferences
    settings: {
        language: { type: String, default: "en" }, // for translation
        theme: { type: String, default: "default" },
        smartReplies: { type: Boolean, default: true }, // enable/disable AI suggestions
        autoTranslate: { type: Boolean, default: false },
        textToSpeech: { type: Boolean, default: false },
        speechToText: { type: Boolean, default: false }
    },

    // Call History
    callHistory: [
        {
            type: { type: String, enum: ["voice", "video"], required: true },
            withUser: { type: Schema.Types.ObjectId, ref: "user" },
            startedAt: { type: Date },
            endedAt: { type: Date },
            duration: { type: Number }, // in seconds
            transcript: { type: String } // AI-generated transcript of call
        }
    ],

    // Notifications
    notifications: [
        {
            type: { type: String, enum: ["friend_request", "message", "call", "system", "ai_summary"] },
            message: { type: String },
            fromUser: { type: Schema.Types.ObjectId, ref: "user" },
            createdAt: { type: Date, default: Date.now },
            isRead: { type: Boolean, default: false }
        }
    ],

    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const User = mongoose.model("user", userSchema);
module.exports = User;
