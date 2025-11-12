import dotenv from "dotenv";

dotenv.config({
    path: "./.env.local"
});
export const envConfig = {
    clientUrl : process.env.CLIENT_URL,
    portNumber : process.env.PORT_NUMBER,
    mongo_url : process.env.MONGO_URL,
    jwt_secret : process.env.JWT_SECRET,
    nodeEnv : process.env.NODE_ENV,
    emailSecret : process.env.EMAIL_SECRET_KEY,
    cloudinaryName : process.env.CLOUDINARY_CLOUD_NAME,
    cloudinarySecretKey : process.env.CLOUDINARY_CLOUD_API_SECRET_KEY,
    cloudinaryApiKey : process.env.CLOUDINARY_CLOUD_API_KEY,
    arcjetKey : process.env.ARCJET_KEY
}