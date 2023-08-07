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
import PatchEmployeeDto from "../dto/patch-employee-dto";
import logger from "../logger/logger";
import DepartmentService from "./department.service";

class EmployeeService{
    
    constructor (private employeeRepository : EmployeeRepository,
        private departmentService : DepartmentService){
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
        logger.info("Find one function called - service getEmpByid")
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
        newEmp.joining_date = Emp.joining_date;
        newEmp.experience  = Emp.experience;
        const newAddr = new Address()
        newAddr.line1 = Emp.address.line1;
        newAddr.address_line2 = Emp.address.address_line2;
        newAddr.City = Emp.address.City;
        newAddr.State = Emp.address.State;
        newAddr.Country = Emp.address.Country;
        newAddr.pincode = Emp.address.pincode;
        newEmp.address = newAddr;
        
        newEmp.password = await bcrpyt.hash(Emp.password,10);
        
        const dept = await this.departmentService.getDeptById(Emp.department_id);
        if(!dept){
            logger.error("invalid department id provided - 'get' by id -- service")
            throw new HttpException(500,`No Department found id : ${Emp.department_id}`)
        }
        else{
            newEmp.department = dept;
        }

        console.log('############', newEmp)

        const createdEmployee = await this.employeeRepository.postEmployee(newEmp);
        return createdEmployee;
    }
    async deleteEmployeeById(id : number)
    {
        const emp =  await this.employeeRepository.findOneBy(id);
        if (!emp){
            logger.error("invalid employee id provided in 'delete' call")
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
            logger.error("invalid employee id provided in 'post' call")
            throw new HttpException(500,`No Employee found id : ${id}`)
        }
        else{
        newEmp.name= emp.name;
        newEmp.email = emp.email;
        
        newEmp.address.line1 = emp.address.line1;
        newEmp.joining_date = emp.joining_date;
        newEmp.experience  = emp.experience;
        newEmp.address.address_line2 = newEmp.address.address_line2;
        newEmp.address.City = emp.address.City;
        newEmp.address.State = emp.address.State;
        newEmp.address.Country = emp.address.Country;
        newEmp.address.pincode = emp.address.pincode;
    }
    
        return this.employeeRepository.putEmployee(newEmp);
    }


    patchEmployeeById = async (id : number , empToPatch : PatchEmployeeDto) => {
        const Emp = await this.employeeRepository.findOneBy(id);
        if(!Emp){
            logger.error("invalid employee id provided in 'patch' call")
            throw new HttpException(404,`No Employee found id : ${id}`)
        }
        else{
            if (empToPatch.name)
            Emp.name = empToPatch.name;

            if(empToPatch.email)
            Emp.email = empToPatch.email;

            // address city,line1 , address_line2 , can  be patched 

            if(empToPatch.address){
                if(empToPatch.address.City)
                Emp.address.City = empToPatch.address.City;
    
                if(empToPatch.address.line1)
                Emp.address.line1 = empToPatch.address.line1;
    
                if(empToPatch.address.address_line2)
                Emp.address.address_line2 = empToPatch.address.address_line2;

                if(empToPatch.address.State)
                Emp.address.State = empToPatch.address.State;
                
                if(empToPatch.address.Country)
                Emp.address.Country = empToPatch.address.Country;

                if(empToPatch.address.pincode)
                Emp.address.pincode = empToPatch.address.pincode;
    
            }
          
            if(empToPatch.department_id){
            const dept = await this.departmentService.getDeptById(empToPatch.department_id);
            if(!dept){
                logger.info("invalid department id provided in 'patch' call")
                throw new HttpException(500,`No Department found id : ${empToPatch.department_id}`)
            }
            else{
                Emp.department = dept;
            }}

            if(empToPatch.experience)
            Emp.experience = empToPatch.experience;

            if(empToPatch.joining_date)
            Emp.joining_date = empToPatch.joining_date;

            if(empToPatch.password){
                Emp.password = await bcrpyt.hash(empToPatch.password,10);
         
            }

            if(empToPatch.role)
            Emp.role = empToPatch.role;

        }
        // same function as put .
        return this.employeeRepository.putEmployee(Emp);
       
    }

    loginEmployee = async (email : string, password : string) => {
        const employee = await this.employeeRepository.findByEmail(email);
        if (!employee){
            logger.error("Login failed -- service")
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

        return {token : token ,employee: employee}
    }

}

export default EmployeeService;