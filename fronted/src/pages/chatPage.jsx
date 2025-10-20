import React from 'react'
import { useChatStore } from '../Store/useChatStore';
import BorderAnimatedContainer from '../components/BorderAnimated';
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';


function ChatPage() {
  const {activeTab,selectedUser} = useChatStore();
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
            {activeTab === "chats" ? <ChatList/> : <ContactList/>}
          </div>
        </div>

        {/* Right Side */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-smz'>
        {selectedUser ? <ChatContainer/> : <NoConversationPlaceholder/>}
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default ChatPage;

