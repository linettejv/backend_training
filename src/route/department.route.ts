import DepartmentController from "../controller/department.controller";
import AppDataSource from "../db/postgres.db";
import Department from "../entity/department.entity";
import DepartmentRepository from "../repository/department.repository";
import DepartmentService from "../service/department.service";


const departmentRepository = new DepartmentRepository(AppDataSource.getRepository(Department));
const departmentService = new DepartmentService(departmentRepository);
const departmentController = new DepartmentController(departmentService);
const departmentRoute = departmentController.router;
export {departmentService}
export default departmentRoute;