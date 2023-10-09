const express = require("express");
const { EmployeeModel } = require("../model/employee.model");

const employeeRouter = express.Router();

// Get all employees
employeeRouter.get("/employee", async (req, res) => {
  try {
    const allEmployees = await EmployeeModel.find();
    if (!allEmployees || allEmployees.length === 0) return res.status(400).send("No employees type was found!")
    res.status(200).send(allEmployees);
  } catch (error) { 
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Create an employee
employeeRouter.post("/employee", async (req, res) => {
  const payload = req.body;
  try {
    const employee = new EmployeeModel(payload);
    await employee.save();
    res.status(200).send("Employee Posted Successfully");
  } catch (error) {
   
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Update employee data
employeeRouter.patch("/employee/", async (req, res) => {
  const payload = req.body;
  const id = req.body.id;

  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, payload);
    if (!updatedEmployee) {
      return res.status(400).send(`Employee not found ${error.message}`);
    }
    res.status(200).json({ msg: "Employee Update successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

// Delete an employee
employeeRouter.delete("/employee", async (req, res) => {
  const id = req.body.id;

  try {
    const deletedEmployee = await EmployeeModel.findByIdAndRemove(id);
    if (!deletedEmployee) {
      return res.status(400).send(`Employee not found ${error.message}`);
    }
    res.status(200).json({ msg: "Employee Delete successfully" });
  } catch (error) {
    
    res.status(500).send(`Internal Server Error${error.message}` );
  }
});

module.exports = {employeeRouter};
