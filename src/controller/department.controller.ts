import express, { NextFunction } from "express";
import Department from "../entity/department.entity";
import DepartmentService from "../service/department.service";
import CreateDepartmentDto from "../dto/create-department-dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ValidateErrors from "../exception/Validaterrors.exception";
import UpdateDepartmentDto from "../dto/update-department.dto";

class DepartmentController {
    public router: express.Router;
    constructor(private departmentService: DepartmentService) {
        this.router = express.Router();

        this.router.post("/", this.postDepartment);
        this.router.get("/", this.getDepartment);
        this.router.get("/:id", this.getDepartmentById);
        this.router.put("/:id", this.putDepartmentById);
        this.router.delete("/:id", this.deleteDepartmentById);

    }

    postDepartment = async (req: express.Request,
        res: express.Response, next: NextFunction) => {
        //const name = req.body.name;
        try {
            const CreateDepartmentDt = plainToInstance(CreateDepartmentDto, req.body);
            const errors = await validate(CreateDepartmentDt);
            if (errors.length > 0) {
                console.log(errors);
                throw new ValidateErrors(404, "Validation Errors", errors)
            }

            const department = await this.departmentService.createDept(CreateDepartmentDt);
            res.status(200).send(department);
        }
        catch (error) {
            next(error);
        }
    }

    getDepartment = async (req: express.Request,
        res: express.Response, next: NextFunction) => {
        const departments = await this.departmentService.getAllDepartments();
        res.status(200).send(departments);
    }
    getDepartmentById = async (req: express.Request,
        res: express.Response, next: NextFunction) => {
        try {
            const departmentId = Number((req.params.id));
            const department = await this.departmentService.getDeptById(departmentId);
            res.status(200).send(department);
        }
        catch (error) {
            next(error)
        }
    }
    putDepartmentById = async (req: express.Request,
        res: express.Response, next: NextFunction) => {
        try {
            const DeptId = Number((req.params.id))
            const UpdateDeptDt = plainToInstance(UpdateDepartmentDto, req.body);
            const errors = await validate(UpdateDeptDt);
            if (errors.length > 0) {
                console.log(errors);
                throw new ValidateErrors(404, "Validation Errors", errors)
            }

            const deptToChannge = await this.departmentService.replaceDeptById(DeptId, UpdateDeptDt);
            res.status(200).send(deptToChannge);

        }
        catch (error) {
            next(error);
        }
    }

    deleteDepartmentById = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const deptId = Number((req.params.id));
            const dept = await this.departmentService.getDeptById(deptId);
            const departmentToDelete = await this.departmentService.deleteDeptById(deptId);
            res.status(200).send("Department Deleted");
        }
        catch (error) {
            next(error)
        }
        //const employeeId = Number((req.params.id));

    }



}

export default DepartmentController;