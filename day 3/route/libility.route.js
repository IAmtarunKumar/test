const express = require("express");
const { LibilityModel } = require("../model/laibility.model");


const libilityRoute = express.Router()




// Get all libility
libilityRoute.get("/libility", async (req, res) => {
  try {
    const allLibility = await LibilityModel.find();
    if (!allLibility || allLibility.length === 0) return res.status(400).send("No libility type was found!")
    res.status(200).send(allLibility);
  } catch (error) { 
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Create an libility
libilityRoute.post("/libility", async (req, res) => {
  const payload = req.body;
  try {
    const newLibility = new LibilityModel(payload);
    await newLibility.save();
    res.status(200).send("libility Posted Successfully");
  } catch (error) {
   
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Update libility data
libilityRoute.patch("/libility", async (req, res) => {
  const payload = req.body;
  const id = req.body.id;

  try {
    const updateLibility = await LibilityModel.findByIdAndUpdate(id, payload);
    if (!updateLibility) {
      return res.status(400).send(`libility not found ${error.message}`);
    }
    res.status(200).json({ msg: "libility Update successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Delete an libility
libilityRoute.delete("/libility", async (req, res) => {
  const id = req.body.id;

  try {
    const deletedLibility = await LibilityModel.findByIdAndRemove(id);
    if (!deletedLibility) {
      return res.status(400).send(`libility not found ${error.message}`);
    }
    res.status(200).json({ msg: "libility Delete successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});




module.exports={libilityRoute}

