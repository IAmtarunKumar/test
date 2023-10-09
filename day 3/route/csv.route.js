const expense = require("express")
const csvRouter = expense.Router()
const csv=require('csvtojson')

const multer = require("multer")
const { CsvModel } = require("../model/csv.model")
const upload = multer()

csvRouter.get("/csv" , (req,res)=>{
    res.send("done")
})




csvRouter.post("/a", upload.single("csvFile"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded.");
      }
  
      const jsonArray = await csv().fromString(req.file.buffer.toString());
  
      await CsvModel.insertMany(jsonArray);
  
      console.log("Data saved to MongoDB successfully.");
      res.status(200).send("Data saved to MongoDB successfully.");
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Error processing the CSV file.");
    }
  });
 


module.exports={csvRouter}