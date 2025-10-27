import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set,get)=>({
    allContacts : [],
    chats : [],
    messages : [],
    activeTab : "chats",
    selectedUser : null,
    isUserLoading : false,
    isMessagesLoading : false,
    isSoundEnabled : JSON.parse(localStorage.getItem("isSoundEnabled") || "false"),

    toggleSound : ()=>{
        let toggleValue = get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled",JSON.stringify(!toggleValue))
        set({isSoundEnabled: !toggleValue});
    },

    setActiveTab : (activeTab)=> set({activeTab:activeTab}),
    setSelectedUser : (selectedUser)=>set({selectedUser}),
    getAllContacts : async ()=>{
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts:res.data})
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        finally{
            set({isUserLoading : false})
        }
    },
    getMyChatPartner : async()=>{
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            if(res.status == 200){
                set({selectedUser:res.data});
            }
        } catch (error) {
            console.log(`Error at chat:${error?.response?.data?.message}`);
            toast.error(error?.response?.data?.message)
        }
        finally{
            set({isUserLoading});
        }
    }


}))