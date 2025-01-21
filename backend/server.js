const express = require("express");
const app = express()
const formRoutes = require("./routes/formRoutes")
const userRoutes = require("./routes/userRoute")
const eventRoutes = require("./routes/eventRoutes")
const registrationRoutes = require("./routes/registrationRoutes")
const cors = require("cors")
const dbConnection = require("./dbConnection/connection")
require("dotenv").config()

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true        
}))

 
app.use(express.json());

app.use("/user",userRoutes)
app.use("/form",formRoutes)
app.use("/event",eventRoutes)
app.use("/registeration",registrationRoutes)

dbConnection()     
app.listen(process.env.PORT,()=>{
    console.log(`server is runng on : ${process.env.PORT} `);
})        