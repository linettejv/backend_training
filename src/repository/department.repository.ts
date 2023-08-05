import { Repository } from "typeorm";
import Department from "../entity/department.entity";


class DepartmentRepository{
    constructor(private departmentRepository : Repository<Department>){
    }
    
    find():Promise<Department[]>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.departmentRepository.find();
    }

    findOneBy(id : number ): Promise<Department>{
        // const employeeRepository = this.dataSource.getRepository(Employee);
        return this.departmentRepository.findOne({
            where:{ id : id},
        }); 
    }


    postDepartment(newDept : Department) : Promise<Department>
    {
        
        return this.departmentRepository.save(newDept);

    }
    async deleteDepartmentById(id : number) {

        const toDelete = await this.departmentRepository.findOne({
            //id : id,
            where : {id : id},

        }); 

        this.departmentRepository.softRemove(toDelete)
        //return true;
    }
    putDepartment(dept:Department) : Promise<Department>{
        return this.departmentRepository.save(dept);

    }

}

export default DepartmentRepository;