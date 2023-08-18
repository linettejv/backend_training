import EmployeeController from "../controller/employee.controller";
import AppDataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import { Employee } from "../entity/employee.entity";
import DepartmentRepository from "../repository/department.repository";
import EmployeeRepository from "../repository/employee.repository";
import DepartmentService from "../service/department.service";
import EmployeeService from "../service/employee.service";
import { departmentService } from "./department.route";


const employeeRepository = new EmployeeRepository(AppDataSource.getRepository(Employee))
//const departmentRepository = new DepartmentRepository(AppDataSource.getRepository(Department));


const employeeService = new EmployeeService(employeeRepository,departmentService);
const employeeController =new  EmployeeController(employeeService);
const employeeRoute = employeeController.router;

export default employeeRoute;

      