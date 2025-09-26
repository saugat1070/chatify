import { envConfig } from "./src/config/envConfig.js";
import app from "./src/main.js";
const portNumber = envConfig.portNumber || 8000;

const startServer = ()=>{
    app.listen(portNumber,()=>{
        console.log(`Server is running at ${portNumber}`)
    })
}

startServer()