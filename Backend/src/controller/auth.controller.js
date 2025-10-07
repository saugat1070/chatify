import bcrypt from "bcrypt";
import { User } from "../model/ auth.model.js";
import { generateToken } from "../utils/generateToken.js";
import { sendMail } from "../utils/email.js";
import cloudinary from "../utils/cloudinary.js";



export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "please provide valid information",
    });
  }
  if (password.length < 6) {
    return res.status(400).json({
      message: "The length of password must be greater than 6",
    });
  }
  try {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        message: "User with this email is already created",
      });
    }
    const newUser = await User.create({
      name: fullName,
      email: email,
      password: bcrypt.hashSync(password, 10),
    });
    sendMail(newUser?.email);

    if (newUser) {
      await newUser.save();
      generateToken(newUser?._id, res);
      res.status(201).json({
        message: "user created successfully",
        data: {
          _id: newUser._id,
          fullName: newUser?.name,
          email: newUser?.email,
          profilePic: newUser?.profilePic,
        },
      });
    }
  } catch (error) {
    console.log(`Error at SignUp controller:${error?.message}`);
    res
      .status(500)
      .json({ message: "something is wrong at signup controller" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "please provide email and password" });
  try {
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(404).json({ message: "user with this email is not found" });
    const checkPassword = bcrypt.compareSync(password, user?.password);
    if (!checkPassword)
      return res.status(401).json({ message: "password is incorrect" });

    const token = generateToken(user?._id,res);
    res.status(200).json({
        message : "login successfull",
    })
  } catch (error) {
    res.status(500).json({
        error : error?.message
    })
  }
};
export const logout = (_,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message : "logout success"});
}
export const updateProfile = async (req,res)=>{
    const {profileImage} = req.file;
    const {name} = req.body;
    try {
    const userId = req.user._id;
    const upload = await cloudinary.uploader.upload(req.file?.path,{
        folder : "profile_picture"
    });
    const user = await User.findByIdAndUpdate(userId?._id,{
        name : name,
        profilePic : upload.secure_url
    });
    res.status(200).json({message : "profile updated successfully"});
    } catch (error) {
        console.log(`Error at updated profile server:${error?.message}`)
    }

}

export const profile = async (req,res)=>{
  const id = req.user?._id;
  if(!id) return res.status(400).json({message:"please login first"});
  const profile = await User.findOne({_id:id}).select("-password")
  return res.status(200).json({data:profile})
}