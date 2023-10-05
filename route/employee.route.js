const express = require("express");
const { EmployeeModel } = require("../model/employee.model");

const employeeRouter = express.Router();



//get all employees
employeeRouter.get("/employee", async (req, res) => {
  try {
    let all_employee = await EmployeeModel.find();
    res.status(200).json(all_employee);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create employee
employeeRouter.post("/employee", async (req, res) => {
  let payload = req.body;

  try {
    let employee = new EmployeeModel(payload);
    await employee.save();
    res.status(201).json({ msg: "employee Posted Succssfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error)
  }
});

//update employee data
employeeRouter.patch("/employee/:id", async (req, res) => {
  let payload = req.body;
  let id = req.params.id;
  console.log(payload, id);
  try {
    let data = await EmployeeModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).json({ msg: "employee Update successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete the employee
employeeRouter.delete("/employee/:id", async (req, res) => {
  let id = req.params.id;
  
  try {
    let data = await EmployeeModel.findByIdAndUpdate({ _id: id });
    res.status(200).json({ msg: "employee Delete successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { employeeRouter };
