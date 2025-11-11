import React, { useEffect } from 'react'
import { useChatStore } from '../Store/useChatStore'
import { useAuthStore } from '../Store/userAuth';
import ChatHeader from './ChatHeader';
import NoChatHistory from './NoChatHistory';
import MessageInput from './MessageInput';
import { MessagesLoadingSkeleton } from './MessagesLoadingSkeleton';

export default function ChatContainer() {
  const {selectedUser,getMessagesByUserId,messages,isMessagesLoading} = useChatStore();
  const {authUser} = useAuthStore();

  useEffect(()=>{
    getMessagesByUserId(selectedUser?._id);
  },[selectedUser,getMessagesByUserId]);
  console.log(messages)
  return (
    <>
    <ChatHeader/>
    <div className='flex-1 px-6 overflow-y-auto py-8'>
      {messages && messages.length > 0 && !isMessagesLoading ? (
        <div className='max-w-3xl mx-auto space-y-6'>
          {messages.map((message)=>(
            <div
            key={message._id}
            className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
            >
              <div
              className={`chat-bubble relative ${message?.senderId === authUser?._id ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-200" }`}
              >
                {message.img && (
                  <img src={message.image} alt='shared' className='rounded-lg h-48 object-cover'/>
                      )}
                {message.text && (<p className='mt-2 p-2'>{message.text}</p>)}
                <p className='text-xs mt-1 opacity-75 flex items-center gap-1'>
                  {new Date(message?.createdAt).toISOString().slice(11,16)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : isMessagesLoading ? (<MessagesLoadingSkeleton/>) : (<NoChatHistory name={selectedUser?.name}/>)}
    </div>
    <MessageInput/>
    </>
    )
}
