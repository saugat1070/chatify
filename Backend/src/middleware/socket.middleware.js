import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";
import { User } from "../model/ auth.model.js";

export const socketAuthMiddleware = async(socket,next)=>{
try {
    const token = socket.handshake.headers.cookie
    ?.split("; ").find((row)=>row.startsWith("jwt="))
    ?.split("=")[1];

    if(!token){
        console.log("Socket connection rejected:No token provided");
        return next(new Error("Unauthorized - No token provided"));

    };

    //verify token
    const decoded = jwt.verify(token,envConfig.jwt_secret);
    if(!decoded) return next(new Error("Invalid token"));
    const user = await User.findOne({_id:decoded?._id}).select("-password");
    if(!user) return next(new Error("user not found"));

    socket._id = decoded._id;
    socket.user = user;
    next();
    
} catch (error) {
    next(new Error("Error at Socket middleware:"+error?.message));
}


}