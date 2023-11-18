import "reflect-metadata"
import { DataSource } from 'typeorm'
import { ExcelData } from "../entities/excelData";
import { Import_dbf } from "../entities/w0t409";

const path = require("path");

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: 'root',
    database: "swagger_demo",
    synchronize: false,
    logging: false,
    migrations: [path.join(__dirname, "../", `src/migrations/*{.ts,.js}`)],
    migrationsTableName: "migrations",
    entities: [ExcelData, Import_dbf],
    // entities: [path.join(__dirname, "../", `src/entities/*{.ts,.js}`)],


})


// typeorm migration:create ./src/migration/NicheEntity





