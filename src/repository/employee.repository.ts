import { DataSource, Repository } from "typeorm";
import { Employee } from "../entity/employee.entity";
import AppDataSource from "../db/postgres.db";
import { UpdateResult } from "typeorm/driver/mongodb/typings";

class EmployeeRepository{
    constructor(private employeeRepository : Repository<Employee>){
    }

    find():Promise<Employee[]>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.find();
    }

    findOneBy(id : number ): Promise<Employee>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.employeeRepository.findOneBy({
            id : id,
        }); 
    }

    postEmployee(newEmp : Employee) : Promise<Employee>
    {
        
        return this.employeeRepository.save(newEmp);

    }
    deleteEmployeeById(id : number) : boolean{

        this.employeeRepository.softDelete(id)
        return true;
    }
    putEmployee(newEmp:Employee) : Promise<Employee>{
        return this.employeeRepository.save(newEmp);

    }

}

export default EmployeeRepository;