import {Server} from "socket.io";
import http from "http";
import express from "express";
import { envConfig } from "../config/envConfig";

const app = express();
const server = http.createServer(app)


const io = new Server(server,{
    cors : {
        origin : envConfig.clientUrl,
        credentials : true
    }
})

//apply authentication middleware to all socket connections

io.use()