import express, { NextFunction } from "express";
import RolesService from "../service/roles.service";


class RolesController{
    public router : express.Router;

    
    constructor(private rolesService : RolesService
        ) {
            this.router = express.Router();

            this.router.get("/", this.getAllRoles);
        }

        getAllRoles = async (req: express.Request,res : express.Response,next : NextFunction) => {
            const roles = await this.rolesService.getRoles();
            res.status(200).send(roles)
        }
    }


export default RolesController;    