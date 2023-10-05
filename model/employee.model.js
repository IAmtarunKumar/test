const mongoose = require("mongoose");


//employee schema
const employeeTypesSchema = mongoose.Schema({
    salesExecutive: { type: Boolean },
    salesManager: { type: Boolean, required: false },
    shopManager: { type: Boolean, required: false }


}) 


//employee model

const EmployeeModel = mongoose.model("EmployeeTypes" , employeeTypesSchema)

module.exports={EmployeeModel}
