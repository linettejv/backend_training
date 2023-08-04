import { DataSource, Repository } from "typeorm";
import { Employee } from "../entity/employee.entity";
import AppDataSource from "../db/postgres.db";
import { UpdateResult } from "typeorm/driver/mongodb/typings";

class EmployeeRepository{
    constructor(private employeeRepository : Repository<Employee>){
    }

    find():Promise<Employee[]>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.find({
            relations : {
                address : true
            }
        });
    }

    findOneBy(id : number ): Promise<Employee>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.findOne({
            //id : id,
            where : {id : id},
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