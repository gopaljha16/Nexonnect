const express = require("express");
const authroute = express.Router();
const {register , login ,logout , sentOtp, sendVerificationEmail, getMe } = require("../controllers/authController")
const adminMiddleware = require("../middleware/adminMiddleware");
const userMiddleware = require("../middleware/userMiddleware");


//register , login 
authroute.post("/register" , register);
authroute.post("/login" ,  login);
authroute.post("/logout" , userMiddleware , logout);

// Get current user info
authroute.get("/me" , userMiddleware , getMe);

// email section 
authroute.post("/send-otp" , sentOtp )
// link type email verify
authroute.post("/verify-email" , sendVerificationEmail)





module.exports = authroute;