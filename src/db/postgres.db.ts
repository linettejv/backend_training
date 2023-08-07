import * as dotenv from "dotenv";
dotenv.config({path: __dirname+'/.env'})

import { DataSource } from "typeorm";
import { Employee } from "../entity/employee.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Address from "../entity/address.entity";

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.PORT),
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.DATABASE,
    entities: ["dist/entity/*.js"],
    //synchronize: true,
    logging: true,
    namingStrategy : new SnakeNamingStrategy(),
    migrations : ["dist/db/migrations/*.js"]
})

export default AppDataSource;
   