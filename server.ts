import app from "./src/app";
import { envConfig } from "./src/config/config";
//databse connection file import gareko
import "./src/database/connection"

//yo garda ni hunxa, tara functional base mah garda ramro practice ho
// const port = envConfig.portNumber
//   app.listen(port,() =>{
//     console.log(`server haas started at port ${port}`)
//   })


function startServer(){
  const port = envConfig.portNumber
  app.listen(port,() =>{
    console.log(`server has started at port ${port}`)
  })
} 

startServer();