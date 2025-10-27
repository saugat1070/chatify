import { useEffect } from "react";
import { useChatStore } from "../Store/useChatStore"
import {UsersLoadingSkeleton} from "./UserLoadingSkeleton.jsx"
export default function ChatList() {
  const {getMyChatPartner,chats,isUserLoading,setSelectedUser} = useChatStore();
  useEffect(()=>{
    getMyChatPartner()
  },[getMyChatPartner]);
  if(isUserLoading) return <UsersLoadingSkeleton/>
  return (
    <>
    {
      chats.map((chat)=>{
        return <div
        key={chat?._id}
        className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20"
        onClick={()=>setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className="avatar avatar-online">
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.name} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{chat.name}</h4>
          </div>
        </div>
      })
    }
    </>
  )
}
