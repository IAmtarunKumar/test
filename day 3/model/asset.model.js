const mongoose = require("mongoose")

// Define a custom validation function
function validateType(value) {
    return value === "Cash in hand" || value === "Property" || value === "Plant and Machinery"  || value === "Bank Account";
  }


//schema
const assetSchema = mongoose.Schema({
    type: { type: String, required: true, validate: {   validator: validateType,  message: "Type must be 'Cash in hand' or 'Property' or 'Plant and Machinery' or 'Bank Account' ",
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

const AssetModel = mongoose.model("asset",assetSchema)

module.exports={AssetModel}