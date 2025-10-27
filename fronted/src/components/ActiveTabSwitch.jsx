import React from 'react'
import { useChatStore } from '../Store/useChatStore'

export default function ActiveTabSwitch() {
  const {activeTab,setActiveTab} = useChatStore();
  return (
    <div className='tabs tabs-box bg-transparent p-2   w-full'>
      <button 
      onClick={()=> setActiveTab("chats")}
      className={`tab ${activeTab == "chats" ? "bg-cyan-500/50 text-cyan-400" : "text-slate-400"} w-[50%] `}
      >Chats</button>
      <button onClick={()=> setActiveTab("contacts")}
       className={`tab ${activeTab == "contacts" ? "bg-cyan-500/50 text-cyan-400" : "text-slate-400"} w-[45%]`}
 
        >Contacts</button>
    </div>
  )
}
