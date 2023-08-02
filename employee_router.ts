import express from "express";
import { Employee } from "./employee";

const employeeRouter = express.Router();
let count = 2;

// get for all employees
employeeRouter.get('/',(req,res) => {
    console.log(req.url);
    res.status(200).send(employees);
})
// get for particular employee
employeeRouter.get('/:id',(req,res) => {
    console.log(req.url);
    
    res.status(200).send(employees.find((employee) => 
    {return employee.id === Number(req.params.id)}));
})


employeeRouter.post('/',(req,res) => {
    console.log(req.url);
    const newEmp = new Employee();
    newEmp.name = req.body.name;
    newEmp.email = req.body.email;
    newEmp.createdAt = new Date();
    newEmp.updatedAt = new Date();
    newEmp.id  = ++ count;
    employees.push(newEmp);
    res.status(200).send(newEmp);
})

employeeRouter.put('/:id',(req,res) => {
    console.log(req.url);
    //res.status(200).send("replaced employee");
    const emp = employees.find((employee) => 
    {return employee.id === Number(req.params.id)});
    emp.name = req.body.name;
    emp.email = req.body.email;
    emp.updatedAt = new Date();
    res.status(200).send(emp);
    
})

// employeeRouter.patch('/:id',(req,res) => {
//     console.log(req.url);
//     res.status(200).send("patched employees");
// })

employeeRouter.delete('/:id',(req,res) => {
    const empInx = employees.findIndex((employee) => 
    {return employee.id === Number(req.params.id)});
    employees.splice(empInx,1);
    res.status(200).send("Employee Deleted ");
    
})

const employees: Employee[] = [{
    id : 1,
    name : "John",
    email : "mail@gmail.com",
    createdAt: new Date(),
    updatedAt : new Date(),
},
{
    id : 2,
    name : "James",
    email : "james@gmail.com",
    createdAt: new Date(),
    updatedAt : new Date(),
}]

export default employeeRouter;