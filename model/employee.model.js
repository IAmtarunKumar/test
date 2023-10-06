const mongoose = require("mongoose");


//employee schema

const employeeTypesSchema = mongoose.Schema({
    Type: { type: String , required : true },
    


}) 


//employee model

const EmployeeModel = mongoose.model("EmployeeTypes" , employeeTypesSchema)

module.exports={EmployeeModel}
