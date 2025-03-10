import { Router, Request, Response } from "express";
import { Employee } from "../types/employee";
import { v4 as uuidv4 } from "uuid";

const employeeRouter = Router();

const employees: Employee[] = [];

//get employees
employeeRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(employees);
});

//search employees
employeeRouter.get("/search", (req: Request<{}, {}, {}, { firstname: string }>, res: Response) => {
  const { firstname } = req.query;
  const foundUsers = employees.filter((employee) =>
    employee.firstname.toLowerCase().includes(firstname.toLowerCase())
  );
  if (foundUsers.length === 0) {
    res.status(404).send("No matching employees!");
    return;
  }
  res.status(200).json(foundUsers);
});

//Get employee by ID
employeeRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
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
employeeRouter.post("/", (req: Request<{}, {}, Omit<Employee, "id">>, res: Response) => {
  const newEmployee: Employee = {
    id: uuidv4(),
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
employeeRouter.put("/:id", (req: Request<{ id: string }, {}, Partial<Employee>>, res: Response) => {
  const { id } = req.params;
  const foundIndex = employees.findIndex((employee) => employee.id === id);
  if (foundIndex === -1) {
    res.status(404).send("User not found");
    return;
  }
  const updatedUser: Employee = {
    ...employees[foundIndex], // Copy over all properties
    firstname: req.body.firstname ?? employees[foundIndex].firstname,
    lastname: req.body.lastname ?? employees[foundIndex].lastname,
    age: req.body.age ?? employees[foundIndex].age,
    isMarried: req.body.isMarried ?? employees[foundIndex].isMarried,
  };
  employees[foundIndex] = updatedUser;
  res.status(200).json(updatedUser);
});

//  delete a employee
employeeRouter.delete("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const foundIndex = employees.findIndex((employee) => employee.id === id);
  if (foundIndex === -1) {
    res.status(404).send("Employee not found");
    return;
  }
  employees.splice(foundIndex, 1);
  res.status(200).send("Employee was deleted!");
});

export default employeeRouter;

// {
//   "firstname": "adf",
//   "lastname": "asdgf",
//   "age": 12,
//   "isMarried": true
// }
