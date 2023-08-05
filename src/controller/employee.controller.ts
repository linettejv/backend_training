import exp from "constants";
import EmployeeService from "../service/employee.service";
import  express, { NextFunction }  from "express";
import { plainToInstance } from "class-transformer";
import CreateEmployeeDto from "../dto/create-employee.dto";
import { validate } from "class-validator";
import Address from "../entity/address.entity";
import ValidateErrors from "../exception/Validaterrors.exception";
import { error } from "console";
import UpdateEmployeeDto from "../dto/update-employee.dto";
import { emit } from "process";
import authenticate from "../middleware/authentication.middleware";
import authorize from "../middleware/authorization.middleware";
import { Role } from "../utils/role.enum";


class EmployeeController{
    public router : express.Router;
    
    constructor(private employeeService : EmployeeService
        ) {
        this.router = express.Router();
        // this.employeeService = new EmployeeService();
        // everyone has access:
        this.router.get("/",authenticate,this.getAllEmployees.bind(this));
        // everyone 
        this.router.get("/:id",this.getEmployeeById);
    
        this.router.post("/",authenticate,authorize([Role.HR, Role.MANAGER]), this.postEmployee);
        // hr and manager   authorize([Role.HR, Role.MANAGER]
        this.router.delete("/:id",this.deleteEmployeeById);
        // hr has access   authorize([Role.HR]
        this.router.put("/:id",this.replaceEmployeeById);
        // everyone should login 
        this.router.post("/login" , this.loginEmployee)
    
    }

    async getAllEmployees(req: express.Request , res: express.Response){
        const employees =  await this.employeeService.getAllEmployees();
       
        res.status(200).send(employees);
    }

    getEmployeeById = async (req : express.Request , res : express.Response , next : NextFunction) => {
       try{
        const employeeId = Number((req.params.id));
        const employee = await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(employee);
       }
       catch (error){
        next(error)
       }

    }
    // create employee
    postEmployee = async(req: express.Request , res: express.Response , next: NextFunction) => {
        try{ 
           
            const CreateEmployeeDt = plainToInstance(CreateEmployeeDto , req.body);
            const errors = await validate(CreateEmployeeDt);
            if (errors.length > 0 ){
                console.log(errors);
                throw new ValidateErrors(404 , "Validation Errors", errors)
            }
            const employees =  await this.employeeService.createEmp(CreateEmployeeDt);
            res.status(200).send(employees);}


            catch(error){
                next(error)
            }
       
    }

    deleteEmployeeById = async (req : express.Request , res : express.Response , next :NextFunction) => {
        try{
            const employeeId = Number((req.params.id));
            const employee = await this.employeeService.getEmployeeById(employeeId);
            const employeeToDelete = await this.employeeService.deleteEmployeeById(employeeId);
            res.status(200).send("Employee Deleted");
           }
           catch (error){
            next(error)
           }
        //const employeeId = Number((req.params.id));

    }

    // put;
    replaceEmployeeById = async (req : express.Request , res : express.Response , next : NextFunction) => {

        try{
        const employeeId = Number((req.params.id));
        //const employee = await this.employeeService.getEmployeeById(employeeId);

        const UpdateEmployeeDt = plainToInstance(UpdateEmployeeDto , req.body);
            const errors = await validate(UpdateEmployeeDt);
            if (errors.length > 0 ){
                console.log(errors);
                throw new ValidateErrors(404 , "Validation Errors", errors)
            }


        const employeeToChannge = await this.employeeService.replaceEmployeeById(employeeId, UpdateEmployeeDt);
        res.status(200).send(employeeToChannge);
        }
        catch(error){
            next(error)
        }
    }

    public loginEmployee = async (
        req : express.Request , res : express.Response , next : NextFunction
    ) =>{

        const email = req.body.email;
        const password = req.body.password;

        try{

            const token = await this.employeeService.loginEmployee(email , password);
            res.status(200).send({data:token})

        }catch(error){
            next(error);
        }

    }

}

export default EmployeeController;