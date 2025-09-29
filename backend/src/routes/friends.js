const firendsAuth = require("express").Router();
const userMiddleware = require("../middleware/userMiddleware");
const { getAllRequests , sendRequest } = require("../controllers/friendsController");

firendsAuth.get("/all-requests" , userMiddleware , getAllRequests);
firendsAuth.post("/send-request" , userMiddleware , sendRequest);

module.exports = firendsAuth;