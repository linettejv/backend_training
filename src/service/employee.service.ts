import { UpdateResult } from "typeorm";
import { Employee } from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";

class EmployeeService{
    
    constructor (private employeeRepository : EmployeeRepository){
        //this.employeeRepository = new EmployeeRepository();
    }

    getAllEmployees() : Promise<Employee[]>
    {
        // place to add business logic
        return this.employeeRepository.find();
    }

    async getEmployeeById(id :number ) : Promise<Employee | null>
    {
        // place to add some more logic:
        const emp =  await this.employeeRepository.findOneBy(id);
        if (!emp){
            throw new HttpException(500,`No Employee found id : ${id}`)
            //return null;
        }
        return emp;
    }

    createEmp(email : string , name : string , address : any) : Promise<Employee>
    {
        const newEmp = new Employee;
        newEmp.name = name;
        newEmp.email = email;

        const newAddr = new Address()
        newAddr.line1 = address.line1;
        newAddr.pincode = address.pincode;
        newEmp.address = newAddr;

        return this.employeeRepository.postEmployee(newEmp);
    }
    async deleteEmployeeById(id : number)
    {
        const emp =  await this.employeeRepository.findOneBy(id);
        if (!emp){
            throw new HttpException(500,`No Employee found id : ${id}`)
            //return null;
        }
        else
        this.employeeRepository.deleteEmployeeById(id);
        //return true;
    }
    async replaceEmployeeById(id : number, email:string , name : string , address : any) : Promise<Employee>{
        const newEmp = await this.employeeRepository.findOneBy(id);
        if(!newEmp){
            throw new HttpException(500,`No Employee found id : ${id}`)
        }
        else{
        newEmp.name= name;
        newEmp.email = email;
        newEmp.address.line1 = address.line1;
        newEmp.address.pincode = address.pincode;
    }
    
        return this.employeeRepository.putEmployee(newEmp);
    }

}

export default EmployeeService;