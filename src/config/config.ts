import { config } from 'dotenv'
import { Dialect } from 'sequelize'
config()

export const envConfig = {
  portNumber : Number(process.env.PORT),
  database : process.env.DB_NAME,
  username : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD,
  host : process.env.DB_HOST,
  dialect : process.env.DB_DIALECT as Dialect,
  port : process.env.DB_PORT
}