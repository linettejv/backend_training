import express from "express";
import { Employee } from "./employee";
import { Client } from 'pg';
import { DataSource, FindOptionsWhere, Like } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import AppDataSource from "./data-source";

const employeeRouter = express.Router();
let count = 2;

///
// const client = new Client({
//     host: 'localhost',
//     port: 8765,
//     database: 'training',
//     user: 'postgres',
//     password: 'postgres',
//   });
///  

// get for all employees
    employeeRouter.get('/',async(req,res) => {
            // console.log(req.url);
            // res.status(200).send(employees);
    const nameFilter = req.query.name;
    const emailFilter = req.query.email;
    // console.log(nameFilter);
    const employeeRepository = AppDataSource.getRepository(Employee);

    const qb = employeeRepository.createQueryBuilder();
    if(nameFilter){
    qb.andWhere("name LIKE :somename" , {somename : `%${nameFilter as string}%`});}
    if(emailFilter){
        qb.andWhere("email  LIKE :sampleEmail" , {sampleEmail : `%${emailFilter as string}%`});
    }
    const employees = await qb.getMany();

    // const filter : FindOptionsWhere<Employee> = {};
    //     if(nameFilter){
    //     filter.name = Like("%" + nameFilter as string + "%")}
    

    // const employees = await employeeRepository.find({where : filter
    // });
    res.status(200).send(employees);
})


// get for particular employee
employeeRouter.get('/:id',async(req,res) => {
    console.log(req.url);
    
//    await client.connect();

   // await AppDataSource.initialize();
    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id : Number(req.params.id)
    });

    res.status(200).send(employee);

    // const result = await client.query("select * from employee where id = $1",[req.params.id]);
    // res.status(200).send(result.rows[0]);
    //(employees.find((employee) => 
    //{return employee.id === Number(req.params.id)}));
})


employeeRouter.post('/',async(req,res) => {

    console.log(req.url);
    const newEmp = new Employee();
    newEmp.name = req.body.name;
    newEmp.email = req.body.email;
  
   
    const employeeRepository = AppDataSource.getRepository(Employee);
    const savedEmp = await employeeRepository.save(newEmp);

    res.status(200).send(newEmp);

})

employeeRouter.put('/:id',async(req,res) => {
    console.log(req.url);
    //res.status(200).send("replaced employee");
    // const emp = employees.find((employee) => 
    // {return employee.id === Number(req.params.id)});
    //

    const employeeRepository = AppDataSource.getRepository(Employee);
    const emp = await employeeRepository.findOneBy({
        id : Number(req.params.id)
    });
    emp.name = req.body.name;
    emp.email = req.body.email;
    emp.updatedAt = new Date();
    const updated = await employeeRepository.save(emp);
    res.status(200).send(emp);
})

// employeeRouter.patch('/:id',(req,res) => {
//     console.log(req.url);
//     res.status(200).send("patched employees");
// })

employeeRouter.delete('/:id',async(req,res) => {
    // const empInx = employees.findIndex((employee) => 
    // {return employee.id === Number(req.params.id)});
    //employees.splice(empInx,1);

    const employeeRepository = AppDataSource.getRepository(Employee);
    const employee = await employeeRepository.findOneBy({
        id : Number(req.params.id)
    });
    const removed = await employeeRepository.softRemove(employee);
    res.status(200).send("Employee Deleted ");
    
})


export default employeeRouter;