import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.VITE_MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set,get) => ({
    authUser: null,
    isCheckingAuth : true,
    isSignUp : false,
    isLogin : false,
    socket : null,
    onlineUsers : [],
    checkAuth : async ()=>{
        try {
            // const res = await axios.get("http://localhost:3000/api/auth/check");
            const res = await axiosInstance.get("/auth/profile");
            set({authUser:res.data.data});
            if(get().authUser !== null){get().connectSocket()};
            console.log(`call again refersh`)
            set({isCheckingAuth : true})
        } catch (error) {
            set({authUser:null});
            console.log(`Error at checking auth:${error?.message}`)
        }
        finally{
            set({isCheckingAuth : false})
        }
    },
    signup : async (formData)=>{
        set({isSignUp : true})
        try {
            const res = await axiosInstance.post("/auth/signup",formData);
            if(res.status == 201){
                console.log(res)
                set({authUser : res.data})
                toast.success("Account created successfully");
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
        finally{
            set({isSignUp : false})
        }
    },
    login : async (formData)=>{
        set({isLogin : true})
        try {
            const res = await axiosInstance.post("/auth/login",formData);
            if(res.status == 200){
                set({authUser : res.data})
                toast.success("Login successfully 😉");
                get().connectSocket()
               
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
        finally{
            set({isLogin : false})
        }
    },
    logout:async ()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            if(res.status == 200){
                set({authUser:null});
                toast.success("Logout success");
                get().disconnectSocket();
            }
        } catch (error) {
            console.log(`Error on logout:${error}`);
            toast.error(error?.response?.data?.message);
        }
        finally{
            set({isCheckingAuth:false});
        }
    },
    updateProfile : async (data)=>{
        try {
            const res = await axiosInstance.patch("/auth/profile",data,
           { headers : {
                "Content-Type":"multipart/form-data"
            }
        }
            );
            set({authUser:res.data});
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("Error in update profile:",error);
            toast.error(error?.response?.data?.message)
        }
    },
    connectSocket : ()=>{
        const {authUser} = get();
        console.log(authUser)
        if(!authUser || get().socket?.connected) return ;
        //connection of socket.io in client-side
        const socket = io(BASE_URL, {
            withCredentials: true, // this ensures cookies are sent with connection
            autoConnect: true
        });

        socket.connect();
        console.log("socket2:",socket)
        set({socket:socket});
        //listen for online users event
        socket.on("getOnlineUsers",(userIds)=>{
            console.log(`onlineuser:${get().onlineUsers}`)
            set({onlineUsers: userIds});
        })

    },
    disconnectSocket : ()=>{
       if(get().socket?.connected) get().socket.disconnect();
    }
}));