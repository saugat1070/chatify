import React from 'react'
import { useChatStore } from '../Store/useChatStore';
import BorderAnimatedContainer from '../components/BorderAnimated';
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactList from '../components/ContactList';


function ChatPage() {
  const {activeTab} = useChatStore();
  return (
    <div className='relative w-full max-w-6xl h-[800px]'>
      <BorderAnimatedContainer>
        {/* Left side */}
        <div className='w-80 bg-slate-800 backdrop-blur-sm flex flex-col'>
          <ProfileHeader/>
          <ActiveTabSwitch/>
          <div
          className='flex-1 overflow-y-auto p-4 space-y-2'
          >
            {activeTab === "chats" ? <ChatsList/> : <ContactList/>}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage;

