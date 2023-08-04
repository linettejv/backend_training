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


class EmployeeController{
    public router : express.Router;
    
    constructor(private employeeService : EmployeeService
        ) {
        this.router = express.Router();
        // this.employeeService = new EmployeeService();

        this.router.get("/",this.getAllEmployees.bind(this));
        this.router.get("/:id",this.getEmployeeById);
        this.router.post("/",this.postEmployee);
        this.router.delete("/:id",this.deleteEmployeeById);
        this.router.put("/:id",this.replaceEmployeeById);
    
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
            const name = req.body.name;
            const email = req.body.email;
            const address = req.body.address;

            const CreateEmployeeDt = plainToInstance(CreateEmployeeDto , req.body);
            const errors = await validate(CreateEmployeeDt);
            if (errors.length > 0 ){
                console.log(errors);
                throw new ValidateErrors(404 , "Validation Errors", errors)
            }
            const employees =  await this.employeeService.createEmp(email,name,address);
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
        const employee = await this.employeeService.getEmployeeById(employeeId);
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address

        const UpdateEmployeeDt = plainToInstance(UpdateEmployeeDto , req.body);
            const errors = await validate(UpdateEmployeeDt);
            if (errors.length > 0 ){
                console.log(errors);
                throw new ValidateErrors(404 , "Validation Errors", errors)
            }


        const employeeToChannge = await this.employeeService.replaceEmployeeById(employeeId, email,name,address);
        res.status(200).send(employeeToChannge);
        }
        catch(error){
            next(error)
        }
    }

}

export default EmployeeController;