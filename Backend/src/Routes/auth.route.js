import express from "express";
import { login, logout, profile, signup, updateProfile } from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

import {multer,storage} from "../utils/multer.js"
const upload = multer({storage:storage});

const AuthRouter = express.Router();

AuthRouter.route("/signup").post(signup);
AuthRouter.post("/login",login);
AuthRouter.post("/logout",logout);
AuthRouter.route("/profile").patch(protectedRoute,upload.single("profileImage"),updateProfile).get(protectedRoute,profile)



AuthRouter.get("/test",arcjetProtection,(_,res)=>{
    return res.json({message:"testing arcjet routing"})
})

export default AuthRouter;