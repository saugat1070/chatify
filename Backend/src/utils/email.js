import {Resend} from "resend";
import { envConfig } from "../config/envConfig.js";
const resend = new Resend(envConfig.emailSecret);

export const sendMail =async (email,subject = `Welcome to chatify`,htmlContent=`<h2>it's me saugat`)=>{
    try {
        await resend.emails.send({
        from : "saugatgiri1070@gmail.com",
        to : email,
        subject : subject,
        html : htmlContent
    });
    } catch (error) {
        console.error(error?.message)
    }
}