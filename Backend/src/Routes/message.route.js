import express from "express";
import messageController from "../controller/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const messageRouter = express.Router();

import {multer,storage} from "../utils/multer.js";

const upload = multer({storage:storage});

messageRouter.get("/", (req, res) => {
    res.json({ message: "Message route working" });
});

messageRouter.route("/contacts").get(protectedRoute,messageController.getAllContacts);
messageRouter.route("/chats").get(protectedRoute,messageController.getAllChatsPartner);
messageRouter.route("/:id").get(protectedRoute,messageController.getMessage);
messageRouter.route("/send/:id").post(protectedRoute,upload.single("image"),messageController.sendMessage)

export default messageRouter;