const mongoose = require("mongoose")

//schema
const csvSchema = mongoose.Schema({
   "name" : String
  });

const CsvModel = mongoose.model("csv",csvSchema)

module.exports={CsvModel}