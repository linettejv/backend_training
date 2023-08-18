import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../utils/requestWithUser";
import { Role } from "../utils/role.enum";
import HttpException from "../exception/http.exception";



const authorize = ( acceptedRoles: Role[] ) => async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
   // An array of accepted roles
) => {
    try {
        const userRole = req.role;

        // Check if the user's role is included in the acceptedRoles array
        if (!acceptedRoles.includes(userRole)) {
            throw new HttpException(403, "You are not authorized to do this action!");
        }

        next();
    } catch (error) {
        next(error);
    }
}


export default authorize;