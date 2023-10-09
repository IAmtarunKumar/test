const express = require("express");
const { AssetModel } = require("../model/asset.model");

const assetRoute = express.Router()




// Get all Asset
assetRoute.get("/asset", async (req, res) => {
  try {
    const allAsset = await AssetModel.find();
    if (!allAsset || allAsset.length === 0) return res.status(400).send("No Asset type was found!")
    res.status(200).send(allAsset);
  } catch (error) { 
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Create an Asset
assetRoute.post("/asset", async (req, res) => {
  const payload = req.body;
  try {
    const newAsset = new AssetModel(payload);
    await newAsset.save();
    res.status(200).send("Asset Posted Successfully");
  } catch (error) {
   
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Update Asset data
assetRoute.patch("/asset", async (req, res) => {
  const payload = req.body;
  const id = req.body.id;

  try {
    const updateAsset = await AssetModel.findByIdAndUpdate(id, payload);
    if (!updateAsset) {
      return res.status(400).send(`Asset not found ${error.message}`);
    }
    res.status(200).json({ msg: "Asset Update successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Delete an Asset
assetRoute.delete("/asset", async (req, res) => {
  const id = req.body.id;

  try {
    const deletedAsset = await AssetModel.findByIdAndRemove(id);
    if (!deletedAsset) {
      return res.status(400).send(`Asset not found ${error.message}`);
    }
    res.status(200).json({ msg: "Asset Delete successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});




module.exports={assetRoute}

