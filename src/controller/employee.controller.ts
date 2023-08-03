import exp from "constants";
import EmployeeService from "../service/employee.service";
import  express  from "express";

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

    getEmployeeById = async (req : express.Request , res : express.Response) => {
        const employeeId = Number((req.params.id));
        const employee = await this.employeeService.getEmployeeById(employeeId);
        res.status(200).send(employee);
    }

    postEmployee = async(req: express.Request , res: express.Response) => {
        const name = req.body.name;
        const email = req.body.email;
        const employees =  await this.employeeService.createEmp(email,name);
        res.status(200).send(employees);
    }

    deleteEmployeeById = async (req : express.Request , res : express.Response) => {
        const employeeId = Number((req.params.id));
        const employee = await this.employeeService.deleteEmployeeById(employeeId);
        res.status(200).send(employee);
    }
    replaceEmployeeById = async (req : express.Request , res : express.Response) => {
        const employeeId = Number((req.params.id));
        const name = req.body.name;
        const email = req.body.email;
        const employee = await this.employeeService.replaceEmployeeById(employeeId, email,name);
        res.status(200).send(employee);
    }

}

export default EmployeeController;