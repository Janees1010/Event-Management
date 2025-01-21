const mongoose = require("mongoose")
require("dotenv").config()

const dbConnection  = async()=>{
    
     try {
        const respone = await mongoose.connect(process.env.DB_URL)
        console.log("db connected");
     } catch (error) {
          console.log(error.message);
     }
} 

module.exports = dbConnection