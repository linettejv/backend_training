import EmployeeController from "../controller/employee.controller";
import AppDataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import { Employee } from "../entity/employee.entity";
import DepartmentRepository from "../repository/department.repository";
import EmployeeRepository from "../repository/employee.repository";
import EmployeeService from "../service/employee.service";


const employeeRepository = new EmployeeRepository(AppDataSource.getRepository(Employee))
const departmentRepository = new DepartmentRepository(AppDataSource.getRepository(Department));
const employeeService = new EmployeeService(employeeRepository,departmentRepository);
const employeeController =new  EmployeeController(employeeService);
const employeeRoute = employeeController.router;

export default employeeRoute;

      