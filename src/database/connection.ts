import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";

const sequelize = new Sequelize({
  database : envConfig.database,
  username : envConfig.username,
  password : envConfig.password,
  host : envConfig.host,
  dialect : envConfig.dialect,
  port : Number(envConfig.port),
  models : [__dirname + '/models']
})

sequelize.authenticate()
.then(()=>{
  console.log("Connection Established Successfully")
})
.catch((error)=>{
  console.log(`Error : ${error}`)
})

sequelize.sync({alter : true})
.then(()=>{
  console.log("migrated successfully new changes");
})

export default sequelize;