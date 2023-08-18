import * as dotenv from "dotenv";
dotenv.config({path: __dirname+'/.env'})

import { DataSource } from "typeorm";
import { Employee } from "../entity/employee.entity";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Address from "../entity/address.entity";

const AppDataSource = new DataSource({
    type: "postgres",
    host: 'localhost',
    port: 8765,
    username: 'postgres',
    password: 'postgres',
    database: 'training',
    entities: ["dist/entity/*.js"],
    synchronize: false,
    logging: true,
    namingStrategy : new SnakeNamingStrategy(),
    migrations : ["dist/db/migrations/*.js"]
})

export default AppDataSource;
   