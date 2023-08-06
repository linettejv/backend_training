import { DataSource, Repository } from "typeorm";
import { Employee } from "../entity/employee.entity";
import AppDataSource from "../db/postgres.db";
import { UpdateResult } from "typeorm/driver/mongodb/typings";

class EmployeeRepository{
    constructor(private employeeRepository : Repository<Employee>){
    }

    async find():Promise<Employee[]>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        const emp = await  this.employeeRepository.find({ 
            relations : 
                ['department','address']
        });
        
        const empDept = emp.map(employee=>({
            ...employee,
            department_id: employee.department ? employee.department.id : null, 
            department:undefined }))

        return empDept;    
    }

    async findOneBy(id : number ): Promise<Employee>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        const emp= await this.employeeRepository.findOne({
            //id : id,
            where : {id : id},
            relations :["department","address"]

        }); 

        // this is used to append the department id to the result : IMPORTANT!
        const employeesDept = {
            ...emp,
            department_id: emp.department ? emp.department.id : null, 
            department:undefined };

        return employeesDept    
    }

    async findByEmail(email : string): Promise<Employee>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        const emp = await  this.employeeRepository.findOne({
            //id : id,
            where : {email : email},
            relations :{
                address : true,
            }
        }); 
        const employeesDept = {
            ...emp,
            department_id: emp.department ? emp.department.id : null, 
            department:undefined };

        return employeesDept 
    }

    async postEmployee(newEmp : Employee) : Promise<Employee>
    {
        
        const emp = await this.employeeRepository.save(newEmp);
        const employeesDept = {
            ...emp,
            department_id: emp.department ? emp.department.id : null, 
            department:undefined };

        return employeesDept; 

    }
    async deleteEmployeeById(id : number) {

        const toDelete = await this.employeeRepository.findOne({
            //id : id,
            where : {id : id},
            relations :{
                address : true,
            }

        }); 

        this.employeeRepository.softRemove(toDelete)
        //return true;
    }
    async putEmployee(newEmp:Employee) : Promise<Employee>{
        const emp = await this.employeeRepository.save(newEmp);
        const employeesDept = {
            ...emp,
            department_id: emp.department ? emp.department.id : null, 
            department:undefined };

        return employeesDept; 

    }

}

export default EmployeeRepository;