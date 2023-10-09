const express = require("express");
const { ExpenseModel } = require("../model/expense.model");


const expenseRoute = express.Router()




// Get all expense
expenseRoute.get("/expense", async (req, res) => {
  try {
    const allexpense = await ExpenseModel.find();
    if (!allexpense || allexpense.length === 0) return res.status(400).send("No expense type was found!")
    res.status(200).send(allexpense);
  } catch (error) { 
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Create an expense
expenseRoute.post("/expense", async (req, res) => {
  const payload = req.body;
  try {
    const newexpense = new ExpenseModel(payload);
    await newexpense.save();
    res.status(200).send("expense Posted Successfully");
  } catch (error) {
   
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Update expense data
expenseRoute.patch("/expense", async (req, res) => {
  const payload = req.body;
  const id = req.body.id;

  try {
    const updateExpense = await ExpenseModel.findByIdAndUpdate(id, payload);
    if (!updateExpense) {
      return res.status(400).send(`expense not found ${error.message}`);
    }
    res.status(200).json({ msg: "expense Update successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Delete an expense
expenseRoute.delete("/expense", async (req, res) => {
  const id = req.body.id;

  try {
    const deletedExpense = await ExpenseModel.findByIdAndRemove(id);
    if (!deletedExpense) {
      return res.status(400).send(`expense not found ${error.message}`);
    }
    res.status(200).json({ msg: "expense Delete successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});




module.exports={expenseRoute}

