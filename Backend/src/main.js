import express from "express";
import AuthRouter from "./Routes/auth.route.js";
import messageRouter from "./Routes/message.route.js";
import path from "path";
import { connectDb } from "./config/connectionDb.js";
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express();

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true     // allow cookies/auth headers
}))
//For Routing
app.use("/api/auth",AuthRouter);
app.use("/api/messages",messageRouter);


//for deployment
const __dirname = path.resolve();

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname,"../fronted/dist")));

    app.use((req, res) => {
        res.sendFile(path.join(__dirname,"../fronted","dist","index.html"));
    });
}


export default app;