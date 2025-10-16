import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth : true,
    isSignUp : false,
    isLogin : false,
    checkAuth : async ()=>{
        try {
            // const res = await axios.get("http://localhost:3000/api/auth/check");
            const res = await axiosInstance.get("/auth/profile");
            set({authUser:res.data});
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
            }
        } catch (error) {
            console.log(`Error on logout:${error}`);
            toast.error(error?.response?.data?.message);
        }
        finally{
            set({isCheckingAuth:false});
        }
    }
}));