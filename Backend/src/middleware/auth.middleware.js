import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";
import { User } from "../model/ auth.model.js";

export const protectedRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(401).json({message : "unauthorized"});
        const decoded = jwt.verify(token,envConfig.jwt_secret);
        console.log(decoded)
        if(!decoded) return res.status(401).json({message : "invalid token"});
        const user = await User.findOne({_id:decoded._id}).select("-password");
        if(!user) return res.status(404).json({message : "User is not found"});
        req.user = user;
        next();
    } catch (error) {
        console.log(`Error at auth middleware:${error?.message}`);
        res.status(500).json({message : "internal server error"});
    }
}