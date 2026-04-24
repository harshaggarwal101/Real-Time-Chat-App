console.log("FILE LOADED");

require("dotenv").config();
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
const dbConnect=()=>{
    mongoose
      .connect(MONGO_URI)
      .then(() => console.log(" Db CONNECTED OK"))
      .catch((err) => console.log("CONNECTION ERROR →", err));
}
module.exports=dbConnect;

