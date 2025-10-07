import express from "express";
import messageController from "../controller/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/", (req, res) => {
    res.json({ message: "Message route working" });
});

messageRouter.route("/contacts").get(messageController.getAllContacts);
messageRouter.route("/chats").get(messageController.getAllChatsPartner);
messageRouter.route("/:id")/get(messageController.getMessage);
messageRouter.route("/send/:id").post(messageController.sendMessage)

export default messageRouter;