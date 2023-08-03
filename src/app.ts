import express from "express";
import employeeRoute from "./route/employee.route";
import loggerMiddleware from "./middleware/logger.middleware";
import "reflect-metadata"
import AppDataSource from "./db/postgres.db";
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

(async () => {
    await AppDataSource.initialize();
    server.listen(3000 , () => {
        console.log("server listening to 3000")
    } );
})();

