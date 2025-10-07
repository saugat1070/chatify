import express from "express";
import AuthRouter from "./Routes/auth.route.js";
import messageRouter from "./Routes/message.route.js";
import path from "path";
import { connectDb } from "./config/connectionDb.js";
import cookieParser from "cookie-parser"

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//For Routing
app.use("/api/auth",AuthRouter);
app.use("/api/messages",messageRouter);

app.get("/",(_,res)=>{
    res.status(200).json({message:"starting"})
})

//for deployment
const __dirname = path.resolve();

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../fronted/dist")));

    app.use((req, res) => {
        res.sendFile(path.join(__dirname,"../fronted","dist","index.html"));
    });
}


export default app;