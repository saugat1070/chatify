
import { User } from "../model/ auth.model.js";
import Message from "../model/message.model.js";
class MessageController{
    async getAllContacts(req,res) {
        const loggesInUser = req.user?.id;
        if(!loggesInUser){
            return res.status(200).json({
                message : "user must be login"
            });
        }
        try {
            
        } catch (error) {
            
        }
    }

    async getAllChatsPartner(){

    }
    async getMessage(){

    }
    async sendMessage(){}
}
const messageController = new MessageController();
export default messageController;