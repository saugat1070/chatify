import { connectDb } from "./src/config/connectionDb.js";
import { envConfig } from "./src/config/envConfig.js";
// import app from "./src/main.js";
import "./src/main.js";
import { server } from "./src/utils/socket.js";
const portNumber = envConfig.portNumber || 8000;

const startServer = ()=>{
    server.listen(portNumber,()=>{
        console.log(`Server is running at ${portNumber}`)
        connectDb()
    })
}

startServer()