import { envConfig } from "../config/envConfig";
import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name : envConfig?.cloudinaryName,
    api_key : envConfig?.cloudinaryApiKey,
    api_secret : envConfig?.cloudinarySecretKey
});


export default cloudinary;