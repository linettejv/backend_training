import { UpdateResult } from "typeorm";
import { Employee } from "../entity/employee.entity";
import EmployeeRepository from "../repository/employee.repository";
import Address from "../entity/address.entity";
import HttpException from "../exception/http.exception";
import bcrpyt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";
import { Role } from "../utils/role.enum";
import CreateEmployeeDto from "../dto/create-employee.dto";
import DepartmentRepository from "../repository/department.repository";
import UpdateEmployeeDto from "../dto/update-employee.dto";

class EmployeeService{
    
    constructor (private employeeRepository : EmployeeRepository,
        private departmentRepository : DepartmentRepository){
        //this.employeeRepository = new EmployeeRepository();
    }

    getAllEmployees() : Promise<Employee[]>
    {
        // place to add business logic
        const emp =  this.employeeRepository.find();
    
        return emp;
    }

    async getEmployeeById(id :number ) : Promise<Employee | null>
    {
        // place to add some more logic:
        const emp =  await this.employeeRepository.findOneBy(id);
        console.log("findone function");
        if (!emp){
            throw new HttpException(500,`No Employee found id : ${id}`)
            //return null;
        }
        return emp;
    }

    async createEmp(Emp : CreateEmployeeDto) : Promise<Employee>
    {
        const newEmp = new Employee;
        newEmp.name = Emp.name;
        newEmp.email = Emp.email;
        newEmp.role = Emp.role;
        const newAddr = new Address()
        newAddr.line1 = Emp.address.line1;
        newAddr.pincode = Emp.address.pincode;
        newEmp.address = newAddr;
        newEmp.password = await bcrpyt.hash(Emp.password,10);
        
        const dept = await this.departmentRepository.findOneBy(Emp.department_id);
        if(!dept){
            throw new HttpException(500,`No Department found id : ${Emp.department_id}`)
        }
        else{
            newEmp.department = dept;
        }

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
    async replaceEmployeeById(id : number, emp : UpdateEmployeeDto) : Promise<Employee>{
        const newEmp = await this.employeeRepository.findOneBy(id);
        if(!newEmp){
            throw new HttpException(500,`No Employee found id : ${id}`)
        }
        else{
        newEmp.name= emp.name;
        newEmp.email = emp.email;
        newEmp.address.line1 = emp.address.line1;
        newEmp.address.pincode = emp.address.pincode;
    }
    
        return this.employeeRepository.putEmployee(newEmp);
    }

    loginEmployee = async (email : string, password : string) => {
        const employee = await this.employeeRepository.findByEmail(email);
        if (!employee){
            throw new HttpException(404 , "Incorrect Username Or Password");
        }
        const res = await bcrpyt.compare(password , employee.password);
        if (!res){
            throw new HttpException(401 , "Incorrect Username Or Password")
        }
        // validation done , generate token for that sesssion

        const payload = {
            name : employee.name,
            email : employee.email,
            role : employee.role
        }

        const token = jsonwebtoken.sign(payload, "ABCDE",{
            expiresIn : "10h"
        });

        return {token : token}
    }

}

export default EmployeeService;