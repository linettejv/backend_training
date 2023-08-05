import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import { Employee } from "../../entity/employee.entity";
import { when } from "jest-when";

describe('employee service test cases', () => {
    let employeeService : EmployeeService;
    let employeeRepository : EmployeeRepository;
    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;
        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee))
        employeeService = new EmployeeService(employeeRepository);
    })

    describe("test for get Employee by id " , () => {

        
        test('test getting employee by id with mocking' , async() => { 
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

        test('test getting employee by id ' , async() => { 
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
    })



})