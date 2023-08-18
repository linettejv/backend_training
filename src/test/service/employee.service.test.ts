import { DataSource, Repository } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { Employee } from "../../entity/employee.entity";
import { when } from "jest-when";
import DepartmentRepository from "../../repository/department.repository";
import Department from "../../entity/department.entity";
import { Role } from "../../utils/role.enum";
import Address from "../../entity/address.entity";
import { plainToInstance } from "class-transformer";
import DepartmentService from "../../service/department.service";
import bcrpyt from "bcrypt"
import CreateEmployeeDto from "../../dto/create-employee.dto";
import PatchEmployeeDto from "../../dto/patch-employee-dto";

describe('employee service test cases', () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;
    let departmentRepository: DepartmentRepository;
    let departmentService: DepartmentService;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee))
        departmentRepository = new DepartmentRepository(dataSource.getRepository(Department))
        departmentService = new DepartmentService(departmentRepository);
        employeeService = new EmployeeService(employeeRepository, departmentService);
    })

    describe("test for get Employee by id ", () => {


        test('test getting employee by id with mocking', async () => {
            const mockedfunction = jest.fn();
            // const mockEmp = new Employee();
            // mockEmp.name = " x";
            // mockEmp.email = 
            when(mockedfunction).calledWith(1).mockResolvedValueOnce(null)
            employeeRepository.findOneBy = mockedfunction;

            //const employee = await employeeService.getEmployeeById(1)
            expect(async () => { await employeeService.getEmployeeById(1) }).rejects.toThrowError();
            //expect(employee).toBe(null);
        });

        test('test getting employee by id ', async () => {
            const mockedfunction = jest.fn();
            const mockEmp = new Employee();
            mockEmp.name = " x";
            mockEmp.email = "cywvy";

            when(mockedfunction).calledWith(1).mockResolvedValueOnce(mockEmp)
            employeeRepository.findOneBy = mockedfunction;

            const employee = await employeeService.getEmployeeById(1)
            //expect(async () => { await employeeService.getEmployeeById(1) }).rejects.toThrowError();
            expect(employee).toBe(mockEmp);
        });



        describe('Test if getAllEmployees returns employees', () => {
            test('should return all employees if they exist', async () => {
                const mockedFunction = jest.fn();
                const mockedDepartment: Department = {
                    id: 1,
                    name: "HR",
                    createdAt: new Date(),
                    updatedAt: new Date(),

                }
                const dummyAddress = plainToInstance(Address, {
                    id: 16,
                    line1: "Kannur",
                    pincode: "1234",
                    address_line2: "Pallikunn",
                    City: "kannur",
                    State: "Kerala",
                    Country: "kannur",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                const dummyEmployees: Employee[] = [
                    {
                        id: 19,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        deletedAt: new Date(),
                        name: "vaishnav",
                        //age: 4,
                        email: "vaishnav@gmail.com",
                        joining_date: "3/7/23",
                        experience: 7,
                        password: "$2b$10$OPSXe3IOp1KFexqSsKgrd.IMbOtvOl76Kav.QPzyh2.ymT8j8JQh.",
                        role: Role[Role.HR],
                        address: dummyAddress,
                        department: mockedDepartment
                    }
                ]
                when(mockedFunction).calledWith().mockResolvedValue(dummyEmployees);
                employeeRepository.find = mockedFunction; const employees = await employeeService.getAllEmployees();
                console.log(employees.length);
                expect(employees.length).toBeGreaterThan(0);
            })
        });

        describe("get employee with invalid id", () => {
            test("should return empty array", async () => {
                const mockedfunction = jest.fn();

                when(mockedfunction).calledWith().mockResolvedValue([])
                employeeRepository.find = mockedfunction;
                const employees = await employeeService.getAllEmployees();
                console.log(employees.length);

                expect(employees.length).toEqual(0);

            })
        });

        describe("create employee by id", () => {

            test("Running test on 'post' function", async () => {
                const mockGetDeptById = jest.fn();

                const mockedDepartment: Department = {
                    id: 3,
                    name: "HR",
                    createdAt: new Date('2023-08-07T10:38:04.289Z'),
                    updatedAt: new Date('2023-08-07T10:38:04.289Z'),
                }
                const dummyAddress: Address = {
                    // id: 16,
                    line1: "Kannur",
                    pincode: "1234",
                    address_line2: "Pallikunn",
                    City: "kannur",
                    State: "Kerala",
                    Country: "kannur"
                } as unknown as Address;


                when(mockGetDeptById).calledWith(3).mockResolvedValue(mockedDepartment);
                departmentService.getDeptById = mockGetDeptById;

                bcrpyt.hash = jest.fn().mockResolvedValue("password");

                const input: CreateEmployeeDto =
                {
                    name: "vaishnav",
                    email: "vaishnav@gmail.com",
                    joining_date: "3/7/23",
                    experience: 7,
                    password: "password",
                    role: Role[Role.HR],
                    address: dummyAddress,
                    department_id: 3,
                }

                const dummyResponse: Employee =
                {
                    id: 19,
                    createdAt: new Date('2023-08-07T10:38:04.289Z'),
                    updatedAt: new Date('2023-08-07T10:38:04.289Z'),
                    name: "vaishnav",
                    //age: 4,
                    email: "vaishnav@gmail.com",
                    joining_date: "3/7/23",
                    experience: 7,
                    password: "password",
                    role: Role[Role.HR],
                    address: dummyAddress,
                    department: {
                        id: 3
                    } as Department,
                }

                const postedEmployee =
                {

                    name: "vaishnav",
                    email: "vaishnav@gmail.com",
                    joining_date: "3/7/23",
                    experience: 7,
                    password: 'password',
                    role: Role[Role.HR],
                    address: dummyAddress,
                    department: {
                        id: 3,
                        name: 'HR',
                        createdAt: new Date('2023-08-07T10:38:04.289Z'),
                        updatedAt: new Date('2023-08-07T10:38:04.289Z')
                    }
                }


                const mockPostEmp = jest.fn();
                console.log('***********', postedEmployee)
                when(mockPostEmp).calledWith(postedEmployee).mockResolvedValue(dummyResponse);
                employeeRepository.postEmployee = mockPostEmp;

                const output = await employeeService.createEmp(input);
                expect(output).toStrictEqual(dummyResponse)

            })

            test("delete employee by id ", async () => {
                const emp: Employee = {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    id: 34,
                    name: "Ashok",
                    "email": "ash",
                    "password": "ashok",
                    "joining_date": "11/02/2012",
                    "experience": 8,
                    "department": new Department,
                    "role": Role.HR,
                    "address": new Address

                }

                jest.spyOn(employeeRepository, 'findOneBy')
                when(employeeRepository.findOneBy).calledWith(emp.id).mockResolvedValue(emp);

                jest.spyOn(employeeRepository, 'deleteEmployeeById')
                when(employeeRepository.deleteEmployeeById).calledWith(emp.id).mockResolvedValue();

                await employeeService.deleteEmployeeById(emp.id);

                expect(employeeRepository.deleteEmployeeById(emp.id)).toHaveBeenCalled;


            })

            test("Patch employee function -- service", async() => {
                const mockedFindone = jest.fn();
                const emp: Employee = {
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    id: 34,
                    name: "Ashok",
                    "email": "ash",
                    "password": "ashok",
                    "joining_date": "11/02/2012",
                    "experience": 8,
                    "department": new Department,
                    "role": Role.HR,
                    "address": new Address

                }

                jest.spyOn(employeeRepository, 'findOneBy')
                when(employeeRepository.findOneBy).calledWith(emp.id).mockResolvedValue(emp);


                const dummyAddress: Address = {
                    // id: 16,
                    line1: "Kannur",
                    pincode: "1234",
                    address_line2: "Pallikunn",
                    City: "kannur",
                    State: "Kerala",
                    Country: "kannur"
                } as unknown as Address;


                const mockedDepartment: Department = {
                    id: 3,
                    name: "HR",
                    createdAt: new Date('2023-08-07T10:38:04.289Z'),
                    updatedAt: new Date('2023-08-07T10:38:04.289Z'),
                }

                const mockGetDeptById = jest.fn();

                when(mockGetDeptById).calledWith(3).mockResolvedValue(mockedDepartment);
                departmentService.getDeptById = mockGetDeptById;

                bcrpyt.hash = jest.fn().mockResolvedValue("password");

                const input: PatchEmployeeDto =
                {
                    name: "vaishnav",
                    email: "vaishnav@gmail.com",
                    joining_date: "3/7/23",
                    experience: 7,
                    password: "password",
                    role: Role[Role.HR],
                    address: dummyAddress,
                    department_id: 3,
                }
                const postedEmployee =
                {

                    name: "vaishnav",
                    email: "vaishnav@gmail.com",
                    joining_date: "3/7/23",
                    experience: 7,
                    password: 'password',
                    role: Role[Role.HR],
                    address: dummyAddress,
                    department: {
                        id: 3,
                        name: 'HR',
                        createdAt: new Date('2023-08-07T10:38:04.289Z'),
                        updatedAt: new Date('2023-08-07T10:38:04.289Z')
                    }
                }

                const mockedPutFunction = jest.fn();
                when(mockedPutFunction).calledWith(input).mockResolvedValue(postedEmployee);
                employeeRepository.putEmployee = mockedPutFunction;
                
                // const employee = await employeeService.patchEmployeeById(34,input)
                // expect(employee).toBe(postedEmployee);

                //expect(employeeRepository.findOneBy).toHaveBeenCalledWith(emp.id);
                expect(employeeRepository.putEmployee).toHaveBeenCalledWith(expect.any(Object));
            


            })


        })

    })
})