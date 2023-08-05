import { DataSource, Repository } from "typeorm";
import { Employee } from "../entity/employee.entity";
import AppDataSource from "../db/postgres.db";
import { UpdateResult } from "typeorm/driver/mongodb/typings";

class EmployeeRepository{
    constructor(private employeeRepository : Repository<Employee>){
    }

    async find():Promise<Employee[]>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        const emp = await this.employeeRepository.find({ 
            relations : 
                ["department","address"]
        });
        

        return emp;    
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

    findByEmail(email : string): Promise<Employee>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.findOne({
            //id : id,
            where : {email : email},
            relations :{
                address : true,
            }
        }); 
    }

    postEmployee(newEmp : Employee) : Promise<Employee>
    {
        
        return this.employeeRepository.save(newEmp);

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
    putEmployee(newEmp:Employee) : Promise<Employee>{
        return this.employeeRepository.save(newEmp);

    }

}

export default EmployeeRepository;