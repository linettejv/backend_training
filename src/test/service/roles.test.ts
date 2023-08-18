import { Role } from "../../utils/role.enum"
import RoleService from "../../service/roles.service"

describe("Roles test" , () => {

    const roleSer = new RoleService
    test("Get all roles test" , async() => {
        const returnValues = Object.values(Role)
        
        const result = await roleSer.getRoles();

        expect(result).toEqual(returnValues);
    })
})