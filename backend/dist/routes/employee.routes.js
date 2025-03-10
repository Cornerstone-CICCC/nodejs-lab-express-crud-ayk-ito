"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const employeeRouter = (0, express_1.Router)();
const employees = [];
//get employees
employeeRouter.get("/", (req, res) => {
    res.status(200).json(employees);
});
//search employees
employeeRouter.get("/search", (req, res) => {
    const { firstname } = req.query;
    const foundUsers = employees.filter((employee) => employee.firstname.toLowerCase().includes(firstname.toLowerCase()));
    if (foundUsers.length === 0) {
        res.status(404).send("No matching employees!");
        return;
    }
    res.status(200).json(foundUsers);
});
//Get employee by ID
employeeRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const employee = employees.find((employee) => employee.id === id);
    if (!employee) {
        res.status(404).send("employee not found");
        return;
    }
    console.log(employee);
    res.status(200).json(employee);
});
//  Adds a new employee
employeeRouter.post("/", (req, res) => {
    const newEmployee = {
        id: (0, uuid_1.v4)(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried,
    };
    employees.push(newEmployee);
    console.log(newEmployee);
    res.status(201).json(newEmployee);
});
//  update a employee
employeeRouter.put("/:id", (req, res) => {
    var _a, _b, _c, _d;
    const { id } = req.params;
    const foundIndex = employees.findIndex((employee) => employee.id === id);
    if (foundIndex === -1) {
        res.status(404).send("User not found");
        return;
    }
    const updatedUser = Object.assign(Object.assign({}, employees[foundIndex]), { firstname: (_a = req.body.firstname) !== null && _a !== void 0 ? _a : employees[foundIndex].firstname, lastname: (_b = req.body.lastname) !== null && _b !== void 0 ? _b : employees[foundIndex].lastname, age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employees[foundIndex].age, isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employees[foundIndex].isMarried });
    employees[foundIndex] = updatedUser;
    res.status(200).json(updatedUser);
});
//  delete a employee
employeeRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const foundIndex = employees.findIndex((employee) => employee.id === id);
    if (foundIndex === -1) {
        res.status(404).send("Employee not found");
        return;
    }
    employees.splice(foundIndex, 1);
    res.status(200).send("Employee was deleted!");
});
exports.default = employeeRouter;
// {
//   "firstname": "adf",
//   "lastname": "asdgf",
//   "age": 12,
//   "isMarried": true
// }
