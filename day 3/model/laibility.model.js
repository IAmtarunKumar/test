const mongoose = require("mongoose")

// Define a custom validation function
function validateType(value) {
    return value === "Duity and Taxes" || value === "Creditor" || value === "Loans";
  }


//schema
const libilitySchema = mongoose.Schema({
    type: { type: String, required: true, validate: {   validator: validateType,  message: "Type must be 'Duity and Taxes' or 'Creditor' or 'Loans'",
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

const LibilityModel = mongoose.model("libility",libilitySchema)

module.exports={LibilityModel}