const express = require("express");
const { EmployeeModel } = require("../model/employee.model");

const employeeRouter = express.Router();

// Get all employees
employeeRouter.get("/employee", async (req, res) => {
  try {
    const allEmployees = await EmployeeModel.find();
    res.status(200).json(allEmployees);
  } catch (error) {
    console.error("Error getting employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create an employee
employeeRouter.post("/employee", async (req, res) => {
  const payload = req.body;

  try {
    const employee = new EmployeeModel(payload);
    await employee.save();
    res.status(201).json({ msg: "Employee Posted Successfully" });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update employee data
employeeRouter.patch("/employee/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(id, payload);
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ msg: "Employee Update successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete an employee
employeeRouter.delete("/employee/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedEmployee = await EmployeeModel.findByIdAndRemove(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ msg: "Employee Delete successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {employeeRouter};
