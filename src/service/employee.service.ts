import { UpdateResult } from "typeorm";
import { Employee } from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";

class EmployeeService{
    
    constructor (private employeeRepository : EmployeeRepository){
        //this.employeeRepository = new EmployeeRepository();
    }

    getAllEmployees() : Promise<Employee[]>
    {
        // place to add business logic
        return this.employeeRepository.find();
    }

    getEmployeeById(id :number ) : Promise<Employee | null>
    {
        // place to add some more logic:
        return this.employeeRepository.findOneBy(id)
    }

    createEmp(email : string , name : string) : Promise<Employee>
    {
        const newEmp = new Employee;
        newEmp.name = name;
        newEmp.email = email;
        return this.employeeRepository.postEmployee(newEmp);
    }
    deleteEmployeeById(id : number) : boolean
    {
        this.employeeRepository.deleteEmployeeById(id);
        return true;
    }
    async replaceEmployeeById(id : number, email:string , name : string) : Promise<Employee>{
        const newEmp = await this.employeeRepository.findOneBy(id);
        newEmp.name= name;
        newEmp.email = email;
    
        return this.employeeRepository.putEmployee(newEmp);
    }

}

export default EmployeeService;