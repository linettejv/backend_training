import express from "express";
import { myCalculator } from "./calculator";
import employeeRouter from "./employee_router";
import loggerMiddleware from "./loggerMiddleware";
import "reflect-metadata"
import AppDataSource from "./data-source";
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


server.use('/employees',employeeRouter);

(async () => {
    await AppDataSource.initialize();
    server.listen(3000 , () => {
        console.log("server listening to 3000")
    } );
})();

