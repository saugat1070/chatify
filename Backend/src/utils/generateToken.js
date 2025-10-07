import jwt from "jsonwebtoken";
import { envConfig } from "../config/envConfig.js";

export const generateToken = (userId,res)=>{
    const token = jwt.sign({_id : userId},envConfig.jwt_secret,{expiresIn : "7d"});
    res.cookie("jwt",token,{
        maxAge : 7*24*60*60*1000,//ms
        httpOnly : true,  //prevent xss attacks: cross-site scripting
        sameSite : "strict", //csrf attacks
        secure : envConfig.nodeEnv == "production" ? true : false
    });
    return token;
}