const express = require("express");
const { User } = require("../model/user.model");
const bcrypt = require("bcrypt")
const userRouter = express.Router();

//get all users
userRouter.get("/user", async (req, res) => {
  try {
    let all_user = await User.find();
    if (!all_user || all_user.length === 0) return res.status(400).send("No employees type was found!")

    res.status(200).send(all_user);
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
    res.status(200).send("Employee Posted Succssfully");
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
      return res.status(400).send(`Employee not found ${error.message}`);
    }
    res.status(200).send("Employee Update successfully");
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
      return res.status(400).send(`Employee not found ${error.message}`);
    }
    res.status(200).send("Employee Delete successfully");
  } catch (error) {
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

//reset password api

app.post("/reset-password", async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword, sessionId } = req.body;

    // Check  newPassword and confirmPassword 
    if (newPassword !== confirmPassword) {
      return res.status(400).send(`New password and confirm password do not match ${error.message}`);
    }

    // get user from the database 
    const user = await User.findOne({sessionId}); 

    if (!user) {
      return res.status(401).send( `User not found.${error.message}` );
    }

    // Check current password is correct
    const isPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(400).send(`Current password is incorrect.${error.message}` );
    }

    // Hash the new password
    const saltRounds = 10; 
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    // Update user password in the database
    user.passwordHash = newPasswordHash;
    await user.save();

    res.status(200).send(`Password reset successfully.` );
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}`);
  }
});

module.exports = { userRouter };
