import dotenv from "dotenv";

dotenv.config({
    path: "./.env.local"
});
export const envConfig = {
    portNumber : process.env.PORT_NUMBER
}