const express = require("express");
const database = require("./config/database");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const redisClient = require("./config/redis");
const authroute = require("./routes/auth");



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authroute)

const initialConnection = async () => {
  await Promise.all([
    redisClient.connect(),
    database()
  ]);
  console.log("Databases Connected");

  app.listen(process.env.PORT, () => {
    console.log(`Server is Listening on port no ${process.env.PORT}`);
  })
}

initialConnection();