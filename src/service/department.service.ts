import CreateDepartmentDto from "../dto/create-department-dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import Department from "../entity/department.entity";
import HttpException from "../exception/http.exception";
import DepartmentRepository from "../repository/department.repository";

class DepartmentService{

    constructor(private departmentRepository : DepartmentRepository){}

    async createDept(Dept : CreateDepartmentDto ){
        const newDept = new Department();
        newDept.name = Dept.name;
        
        //console.log("+++++++++++++++", newDept)
        return this.departmentRepository.postDepartment(newDept);
    }

    getAllDepartments() : Promise<Department[]>
    {
        // place to add business logic
        return this.departmentRepository.find();
    }
    async getDeptById(id : number){
        // place to add some more logic:
        const dep =  await this.departmentRepository.findOneBy(id);
        console.log("findone function");
        if (!dep){
            throw new HttpException(500,`No Department found with id : ${id}`)
            //return null;
        }
        return dep;
    }

    async replaceDeptById(id : number , dept : UpdateDepartmentDto){
        const DeptToChange = await this.departmentRepository.findOneBy(id);
        if(!DeptToChange){
            throw new HttpException(500,`No Such Department with id : ${id}`)
        }
        else{
        DeptToChange.name= dept.name;
    }
    
        return this.departmentRepository.putDepartment(DeptToChange);  
    }

    async deleteDeptById(id : number)
    {
        const emp =  await this.departmentRepository.findOneBy(id);
        if (!emp){
            throw new HttpException(500,`No such department with id : ${id}`)
            //return null;
        }
        else
        this.departmentRepository.deleteDepartmentById(id);
        //return true;
    }
}

export default DepartmentService;