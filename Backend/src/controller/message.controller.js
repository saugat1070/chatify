
import { User } from "../model/ auth.model.js";
import Message from "../model/message.model.js";
import cloudinary from "../utils/cloudinary.js";
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

    async getAllChatsPartner(req,res){
        try {
            const loggedInId = req.user?._id;
            // find all the messages where the logged-in user is either sender or receiver
            const messages = await Message.find(
                {$or : [
                    {senderId : loggedInId},
                    {receiverId : loggedInId}
                ]}
            );
            // Mapping the array to obtain _id
            const chatPartners = [...new Set(messages.map((message)=> message.senderId.toString() === loggedInId.toString() ? message.receiverId.toString() : message.senderId.toString()))];
            //finding the information about user
            const userInformation = await User.find({_id : {
                $in:chatPartners
            }
        }).select("-password")
            res.status(200).json({userInformation})
        } catch (error) {
            
        }
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
    async sendMessage(req,res){
        try {
            const {text,image} = req.body;
            const {id : receiverId} = req.params;
            const senderId = req.user?._id;
            // console.log(`sender:${senderId} and receiver:${receiverId}`)
            if(!receiverId || !senderId){return res.status(401).json({message:"id must be provided"})};
            let imageUrl;
            if(image){
                const uploadResponse = await cloudinary.uploader.upload(image,{
                    folder : "MessageImage"
                })
                imageUrl = uploadResponse.secure_url || "";
            }
            const newMessage = new Message({text:text,senderId:senderId,receiverId:receiverId,image:imageUrl});
            await newMessage.save();

            res.status(200).json(newMessage);
        } catch (error) {
            console.log(`Error at sendMessage Controller:${error?.message}`);
            res.status(500).json({
                message:"internal server error at sendMessage"
            })
        }
    }
}
const messageController = new MessageController();
export default messageController;