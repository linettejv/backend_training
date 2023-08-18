import RolesController from "../controller/roles.controller";
import RolesService from "../service/roles.service";

const rolesService = new RolesService();
const rolesController = new RolesController(rolesService);
const rolesRoute = rolesController.router;

export default rolesRoute;