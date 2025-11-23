import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChatStore'
import { UsersLoadingSkeleton } from './UserLoadingSkeleton';
import { useAuthStore } from '../Store/userAuth';
export default function ContactList() {

  const {isUserLoading,getAllContacts,allContacts,setSelectedUser} = useChatStore();
  useEffect(()=>{
    getAllContacts();
  },[getAllContacts]);

    const {onlineUsers} = useAuthStore();
  
  if(isUserLoading) return <UsersLoadingSkeleton/>
  return (
    <>
    {
      allContacts.map((contact)=>{
        return <div
        key={contact?._id}
        className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20"
        onClick={()=>setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(contact?._id) ? "avatar-online":"avatar-offline" }`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.name} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">{contact.name}</h4>
          </div>
        </div>
      })
    }
    </>
  )
}
