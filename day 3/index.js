const express = require("express")
require("dotenv").config()

//import connection
const {connection} = require("./config/db")
// import asset route 
const { assetRoute } = require("./route/asset.route")
const { incomeRoute } = require("./route/income.route")
const { expenseRoute } = require("./route/expense.route")
const { libilityRoute } = require("./route/libility.route")
const { CsvModel } = require("./model/csv.model")
const { csvRouter } = require("./route/csv.route")


const app = express()
app.use(express.json())


app.get("/", (req,res)=>{
    res.status(200).send("working")
})


//asset router middleware use 
app.use("/" , assetRoute)
app.use("/" , incomeRoute)
app.use("/" , expenseRoute)
app.use("/" , libilityRoute)
app.use("/" , csvRouter)



app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Database is connected")
    } catch (error) {
        console.log(error)
    }
    console.log(`server running on port ${process.env.port}`)
})