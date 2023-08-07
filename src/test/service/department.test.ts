import { DataSource } from "typeorm";
import DepartmentRepository from "../../repository/department.repository"
import DepartmentService from "../../service/department.service"
import Department from "../../entity/department.entity";
import { when } from "jest-when";
import exp from "constants";

describe("Department Tests ", ()=>{

    let departmentRepository : DepartmentRepository;

    let departmentService : DepartmentService;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department));
        departmentService = new DepartmentService(departmentRepository);
    })

    test("Create Department" , async() => {

        const mockFunction = jest.fn();

        const mockDept  = {
            name : "HR",
            
        }
        when(mockFunction).calledWith(mockDept).mockResolvedValue(mockDept);
        departmentRepository.postDepartment = mockFunction;

        const dept = await departmentService.createDept(mockDept);
        expect(dept).toStrictEqual(mockDept);
    })

    test("get all departments " , async () => {
        const mockFunction = jest.fn();

        const mockDepts = [{
            name  : "HR" 
        }]

        when(mockFunction).calledWith().mockResolvedValue(mockDepts);
        departmentRepository.find = mockFunction;

        const depts = await departmentService.getAllDepartments();
        expect(depts.length).toBeGreaterThan(0);
        
    } );

    test("get department by Id ", async() => {
        const mockedFunction = jest.fn();

        const mockDept = {
            name : "HR"
        }

        when(mockedFunction).calledWith(1).mockResolvedValue(mockDept);
        departmentRepository.findOneBy = mockedFunction;

        const dept = await departmentService.getDeptById(1);
        expect(dept).toStrictEqual(mockDept);
    })

    test("Put - replace dept by id " , async () => {
        const mockFindOneBy = jest.fn();

        const mockDept = {
            name : "HR"
        }

        when(mockFindOneBy).calledWith(1).mockResolvedValue(mockDept);
        departmentRepository.findOneBy = mockFindOneBy;

        const mockPutFunction = jest.fn();
        when(mockPutFunction).calledWith(mockDept).mockResolvedValue(mockDept);
        departmentRepository.putDepartment = mockPutFunction;

        const dept = await departmentService.replaceDeptById(1,mockDept);
        expect(dept).toStrictEqual(mockDept);
    })

    test("Delete Department " , async() => {
        const mockDeleteFunction = jest.fn();
        const mockFindOneBy = jest.fn();

        const mockDept = {
            name : "HR"
        }

        when(mockFindOneBy).calledWith(1).mockResolvedValue(mockDept);
        departmentRepository.findOneBy = mockFindOneBy;


        jest.spyOn(departmentRepository,'deleteDepartmentById')

       // when(mockDeleteFunction).calledWith(1).mockResolvedValue(null);
        when(departmentRepository.deleteDepartmentById).calledWith(1).mockResolvedValue();
        await departmentService.deleteDeptById(1);

        expect(departmentRepository.deleteDepartmentById).toHaveBeenCalled
    })
})

