const express = require("express");
const authRoute = express.Router();

//register , login 
authRoute.post("/register" , register);
authRoute.post("/login" , login);
authRoute.delete("/delete" ,deleteUser);
 


module.exports = authRoute;