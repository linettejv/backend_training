
import * as dotenv from "dotenv";
dotenv.config({path: __dirname+'/.env'})

import express, { NextFunction, Request, Response } from "express";
import employeeRoute from "./route/employee.route";
import loggerMiddleware from "./middleware/logger.middleware";
import "reflect-metadata"
import AppDataSource from "./db/postgres.db";
import { error } from "console";
import HttpException from "./exception/http.exception";
import errorMiddleware from "./middleware/error.middleware";
import departmentRoute from "./route/department.route";
import rolesRoute from "./route/roles.route";
import logger from "./logger/logger";


// to use the library

const server = express();
server.use(express.json());
server.use(loggerMiddleware);
// two parameters : what to do on req and 
// res => what to give back to server
// const server = http.createServer((req,res) => {
//     res.writeHead(200);
//     res.end("Hey! Hello there")
//     // front end at 3000 anything that comes to 3000 is handled here 

// } );


server.use('/employees',employeeRoute);

server.use('/department',departmentRoute);

server.use('/roles',rolesRoute);

//error middle ware 
server.use(errorMiddleware);

(async () => {
    await AppDataSource.initialize();
    server.listen(3000 , () => {
        console.log("server listening to 3000");
        logger.info("Server Started Succesfully!");
    } );
})();

