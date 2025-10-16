import React from 'react'
import { useAuthStore } from '../Store/userAuth';



function ChatPage() {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  }

  return (
    <div>
      <button onClick={handleLogout} className="relative bg-blue-500 text-white border-gray-700 px-4 py-2 rounded">
        Log out
      </button>
    </div>
  )
}

export default ChatPage

