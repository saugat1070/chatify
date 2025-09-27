import bcrypt from "bcrypt";
import { User } from "../model/ auth.model.js";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req,res)=>{
    const {fullName,email,password} = req.body;
    if(!fullName || !email || !password){
        return res.status(400).json({
            message : "please provide valid information"
        });
    }
    if(password.length < 6){
        return res.status(400).json({
            message : "The length of password must be greater than 6"
        })
    }
    try {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if(!emailRegex.test(email)){
        return res.status(400).json({
            message : "Invalid email format"
        })
      }

      const user = await User.findOne({email : email});
      if(user){
        return res.status(400).json({
            message : "User with this email is already created"
        })
      }
      const newUser = await User.create({
        name : fullName,
        email : email,
        password : bcrypt.hashSync(password,10)
      })

      if(newUser){
        generateToken(newUser?._id , res);
        await newUser.save();
        res.status(201).json({
            message : "user created successfully",
            data : {
                _id : newUser._id,
                fullName : newUser?.name,
                email : newUser?.email,
                profilePic : newUser?.profilePic
            }
        })
      }
    } catch (error) {
        console.log(`Error at SignUp controller:${error?.message}`)
        res.status(500).json({message : "something is wrong at signup controller"})
    }

}