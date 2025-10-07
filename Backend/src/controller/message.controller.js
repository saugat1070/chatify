
import { User } from "../model/ auth.model.js";
import Message from "../model/message.model.js";
class MessageController{
    async getAllContacts(req,res) {
        const loggedInUser = req.user?.id;
        if(!loggedInUser){
            return res.status(200).json({
                message : "user must be login"
            });
        }
        try {
            const filteredUser = await User.find({_id:{$ne:loggedInUser}}).select("-password");
            res.status(200).json({
                data : filteredUser
            })
        } catch (error) {
            console.log("Error in getAllContacts:",error?.message);
            res.status(500).json({message:"Server error"})
        }
    }

    async getAllChatsPartner(){

    }
    async getMessage(req,res){
        const myId = req.user?._id;
        const {id : userToChatId} = req.params;
        if(!myId || !id){return res.status(400).json({message:"id must be provided"})}
        try {
            const message = await Message.find({
                $or : [
                    {senderId : myId,receiverId:userToChatId},
                    {senderId:userToChatId,receiverId:myId}
                ]
            });
            res.status(200).json(message);
        } catch (error) {
            console.log(`Error:${error?.message}`)
            res.status(500).json({message:"internal server error at getMessage"});
        }
    }
    async sendMessage(){}
}
const messageController = new MessageController();
export default messageController;