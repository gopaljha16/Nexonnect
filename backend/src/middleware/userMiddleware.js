const jwt = require('jsonwebtoken');
const redisClient = require("../config/redis");
const User = require('../models/user');

const userMiddleware = async (req, res, next) => {
    const token =  req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    console.log("middleware token" , token)
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const { userId } = payload

        if (!userId) {
            return res.status(401).json({
                success: false,
                msg: "Invalid token payload"
            })
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(403).json({
                success: false,
                msg: "User not found"
            })
        }

        // check if user logged out (token is blocked)
        const isBlocked = await redisClient.exists(`token:${token}`);
        if (isBlocked) {
            return res.status(401).json({
                success: false,
                message: "Session expired"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = userMiddleware;