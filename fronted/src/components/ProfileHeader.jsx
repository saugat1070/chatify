import React, { useRef, useState } from 'react'
import { useAuthStore } from '../Store/userAuth';
import {LogOutIcon,VolumeOffIcon,Volume2Icon, LogOut} from "lucide-react"
import { useChatStore } from '../Store/useChatStore';
import Swal from "sweetalert2";

const mouseclickSound = new Audio("/sounds/mouse-click.mp3")

export default function ProfileHeader() {
  const {authUser,logout,updateProfile} = useAuthStore();
  const {isSoundEnabled,toggleSound} = useChatStore();
  const [selectedImg,setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);
  const handleImageUpload = async (event)=>{
    const file = event.target.files[0];
    if(!file) return;
    
    setSelectedImg(URL.createObjectURL(file));
    
    try {
      await updateProfile({profileImage: file});
    } catch (error) {
      console.error("Failed to update profile:", error);
      setSelectedImg(null); 
    }
  }

  const handlelogOut =()=> Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Log Out!"
}).then((result) => {
  if (result.isConfirmed) {
    logout()
    Swal.fire({
      title: "Logout success!",
      text: "You have been removed.",
      icon: "success"
    });
  }
});
  return (
    <div className='p-6 h-[100px]  border-b border-slate-700/50'>
      <div className='flex items-center justify-between'>
        <div
        className='flex items-center gap-3'>
          {/* AVATAR */}
          
          <div className='avatar avatar-online'>
            <button className='size-14 rounded-full overflow-hidden relative group'
          onClick={()=> fileInputRef.current.click()}
          >
            <img
             src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt=""
            className='size-full object-cover'
            />
            <div className='absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity'>
          <span className='text-white text-xs'>Change</span>
          </div>
          </button>


            <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleImageUpload}
            className='hidden'
            />
          </div>

          {/* Username and online text */}
          <div>
            <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
              {authUser.name || "unknown"}
            </h3>
            <p className='text-slate-400'>Online</p>
          </div>
        </div>
        {/* right-side of profile header */}
        <div className='flex gap-4'>
          {/* log-out buttons */}
          <button
          className='text-slate-400 hover:text-slate-200 transition-colors'
          onClick={()=>handlelogOut()}>
            <LogOutIcon className='size-5'/>
            </button>
            {/* sound toggle button */}
          <button
          className='text-slate-400 hover:text-slate-200 transition-colors'
          onClick={()=> {
            mouseclickSound.currentTime = 0;
            mouseclickSound.play().catch((err)=>console.log(err?.message));
            toggleSound();
          }}>
            {isSoundEnabled ? (<Volume2Icon className='size-5'/>) : (<VolumeOffIcon className='size-5'/>)}
          </button>
        </div>
      </div>
    </div>
  )
}
