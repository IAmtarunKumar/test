const express = require("express");
const { User } = require("../model/user.model");

const userRouter = express.Router();

//get all users
userRouter.get("/user", async (req, res) => {
  try {
    let all_user = await User.find();
    res.status(200).json(all_user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create user
userRouter.post("/user", async (req, res) => {
  let payload = req.body;

  try {
    let user = new User(payload);
    await user.save();
    res.status(201).json({ msg: "Employee Posted Succssfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error);
  }
});

//update user data
userRouter.patch("/user/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  //   console.log(payload, id);
  try {
    let updateUser = await User.findByIdAndUpdate({ "_id": id }, payload);
    if (!updateUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ msg: "Employee Update successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete the user
userRouter.delete("/user/:id", async (req, res) => {
  let id = req.params.id;

  try {
    let deleteUser = await User.findByIdAndUpdate({ "_id": id });
    if (!deleteUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ msg: "Employee Delete successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { userRouter };
