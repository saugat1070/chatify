import express from "express";
import AuthRouter from "./Routes/auth.route.js";
import messageRouter from "./Routes/message.route.js";

const app = express();

//For Routing
app.use("/api/auth",AuthRouter);
app.use("/api/messages",messageRouter);


export default app;