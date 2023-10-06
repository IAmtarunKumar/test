const express = require("express");
const { User } = require("../model/user.model");

const userRouter = express.Router();

//get all users
userRouter.get("/user", async (req, res) => {
  try {
    let all_user = await User.find();
    if (!all_user || all_user.length === 0) return res.status(400).send("No employees type was found!")

    res.status(200).json(all_user);
  } catch (error) {
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

//create user
userRouter.post("/user", async (req, res) => {
  let payload = req.body;

  try {
    let user = new User(payload);
    await user.save();
    res.status(200).json({ msg: "Employee Posted Succssfully" });
  } catch (error) {
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

//update user data
userRouter.patch("/user", async (req, res) => {
  let payload = req.body;
  let id = req.body.id;
  //   console.log(payload, id);
  try {
    let updateUser = await User.findByIdAndUpdate({ "_id": id }, payload);
    if (!updateUser) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ msg: "Employee Update successfully" });
  } catch (error) {
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

//delete the user
userRouter.delete("/user", async (req, res) => {
  let id = req.body.id;

  try {
    let deleteUser = await User.findByIdAndUpdate({ "_id": id });
    if (!deleteUser) {
      return res.status(400).json({ error: "User not found" });
    }
    res.status(200).json({ msg: "Employee Delete successfully" });
  } catch (error) {
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

module.exports = { userRouter };
