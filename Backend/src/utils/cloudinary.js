import { envConfig } from "../config/envConfig.js";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name : envConfig?.cloudinaryName,
    api_key : envConfig?.cloudinaryApiKey,
    api_secret : envConfig?.cloudinarySecretKey
});

export const uploadCloudinary = ()=>{

}


export default cloudinary;