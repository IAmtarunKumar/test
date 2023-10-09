const express = require("express");
const { IncomeModel } = require("../model/income.model");


const incomeRoute = express.Router()




// Get all income
incomeRoute.get("/income", async (req, res) => {
  try {
    const allIncome = await IncomeModel.find();
    if (!allIncome || allIncome.length === 0) return res.status(400).send("No income type was found!")
    res.status(200).send(allIncome);
  } catch (error) { 
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Create an income
incomeRoute.post("/income", async (req, res) => {
  const payload = req.body;
  try {
    const newIncome = new IncomeModel(payload);
    await newIncome.save();
    res.status(200).send("income Posted Successfully");
  } catch (error) {
   
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Update income data
incomeRoute.patch("/income", async (req, res) => {
  const payload = req.body;
  const id = req.body.id;

  try {
    const updateIncome = await IncomeModel.findByIdAndUpdate(id, payload);
    if (!updateIncome) {
      return res.status(400).send(`income not found ${error.message}`);
    }
    res.status(200).json({ msg: "income Update successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Delete an income
incomeRoute.delete("/income", async (req, res) => {
  const id = req.body.id;

  try {
    const deletedIncome = await IncomeModel.findByIdAndRemove(id);
    if (!deletedIncome) {
      return res.status(400).send(`income not found ${error.message}`);
    }
    res.status(200).json({ msg: "income Delete successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});




module.exports={incomeRoute}

