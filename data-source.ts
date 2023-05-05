import { typeOrmConfig } from "./src/config/typeorm.config";
import { DataSource } from "typeorm";

const dataSource = new DataSource(typeOrmConfig)
console.log(dataSource);

export default dataSource