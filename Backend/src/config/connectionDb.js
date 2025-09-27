import mongoose from "mongoose";
import { envConfig } from "./envConfig.js";

export const connectDb = async ()=>{
    try {
    await mongoose.connect(envConfig.mongo_url)
    .then(()=>{
        console.log("Database Connected Successfully");
    })
    .catch(()=> console.log("There is something Error"))
    } catch (error) {
        console.error(`Error at mongo server:${error.message}`);
        process.exit(1);
    }
}