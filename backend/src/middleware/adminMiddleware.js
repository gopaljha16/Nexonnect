const jwt = require('jsonwebtoken');
const client = require("../config/redis");
const User = require('../models/user');

const adminMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const { _id } = payload

        if (_id) {
            return res.status(401).json({
                success: false,
                msg: "Invalid token payload"
            })
        }

        const user = await User.findById(_id);
        if (!user) {
            res.status(403).json({
                success: false,
                msg: "User not found"
            })
        }

        // user logged out
        const isBlocked = await client.exists(`token:${token}`);
        if (!isBlocked) {
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