import express, { NextFunction } from "express";
import { Role } from "../utils/role.enum";

class RolesService{
  
    constructor(){}

    async getRoles() {
        const roles = Object.values(Role)
        return roles;
    }

    
}

export default  RolesService;