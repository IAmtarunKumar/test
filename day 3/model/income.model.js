const mongoose = require("mongoose")

// Define a custom validation function
function validateType(value) {
    return value === "Sales" || value === "Repair" ;
  }


//schema
const incomeSchema = mongoose.Schema({
    type: { type: String, required: true, validate: {   validator: validateType,  message: "Type must be 'Sales' or 'Repair' ",
      },

      date : {type : String , required : true},
      debit : {type : String , required : false},
      credit : {type : String , required : false},
      balance : {type : String , required : true},
       receivedBy : {type : String , required : false},
      givento : {type : String , required : false},
      partyName : {type : String , required : true},
      refernce : {type : String , required : true},
    description : {type : String , required : false},
    },
  });

const IncomeModel = mongoose.model("income",incomeSchema)

module.exports={IncomeModel}