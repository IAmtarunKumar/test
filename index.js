const express = require("express")

//dotenv require
require("dotenv").config()

const {userRouter} =  require("./route/user.route")
const {employeeRouter} = require("./route/employee.route")
const {connection} = require("./config/db")

const app = express()   // call express
app.use(express.json())  // Json parsar 

const PORT = process.env.port || 4000

app.get("/" , (req,res)=>{
    res.status(200).json({msg : "Route is working"})

})

//use user router
app.use("/api" , userRouter)
app.use("/api" , employeeRouter)

app.listen(PORT , async()=>{
    try {
        await connection
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is running on port ${PORT}`)
})