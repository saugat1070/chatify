import jwt, { verify } from "jsonwebtoken";
import { envConfig } from "../config/envConfig";
import { User } from "../model/ auth.model";

export const socketAuthMiddleware = async(socket,next)=>{
try {
    const token = socket.handshake.headers.cookie
    ?.split(";").find((row)=>row.startsWith("jwt="))
    ?.split("=")[1];

    if(!token){
        console.log("Socket connection rejected:No token provided");
        return next(new Error("Unauthorized - No token provided"));

    };

    //verify token
    const decoded = jwt.verify(token,envConfig.jwt_secret);
    if(!decoded) return next(new Error("Invalid token"));
    
} catch (error) {
    
}


}