const express = require("express");
const database = require("./config/database");
const client = require("./config/redis");
const app = express();
require("dotenv").config();



const initialConnection = async () =>{
    await Promise.all([
        database(),
        client()
    ]);
    console.log("Databases Connected");

    app.listen(process.env.PORT , () =>{
      console.log(`Server is Listening on port no ${process.env.PORT}`);
    })
}

initialConnection();