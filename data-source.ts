import { DataSource } from "typeorm";
import { Employee } from "./employee";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 8765,
    username: "postgres",
    password: "postgres",
    database: "training",
    entities: [Employee],
    //synchronize: true,
    logging: true,
    namingStrategy : new SnakeNamingStrategy(),
})

export default AppDataSource;
   