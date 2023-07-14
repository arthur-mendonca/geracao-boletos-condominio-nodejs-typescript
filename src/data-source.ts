import { DataSource, DataSourceOptions} from "typeorm";
import path from "path";
import "dotenv/config"




const DataSourceConfig = (): DataSourceOptions => {
    
    const entitiesPath = path.join(__dirname, "entities/**.{js,ts}")
    const migrationsPath = path.join(__dirname, "migrations/**.{js,ts}")
    
    if(process.env.NODE_ENV === "test") {return {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    }}

    if(!process.env.DATABASE_URL) throw new Error("Env var DATABAE_URL does not exist")

    return {
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath],
    } 
}

const AppDataSource = new DataSource(DataSourceConfig())

export {AppDataSource}