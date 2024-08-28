import React from 'react';
import useConversation from '../../zustand/useConversation.js';
import { useSocketContext } from '../../context/SocketContext.jsx';


function User({user}) {
  //for zustand
  const {selectedConversation, setSelectedConversation}=useConversation();
  const isSelected=selectedConversation?._id===user._id;
  //for displaying online for an online user
  const {socket, onlineUsers}=useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    //to select user in left pane
      <div 
      className={`hover:bg-slate-600 duration-300 
        ${isSelected ? "bg-slate-700" : ""}`} 
      onClick={()=>setSelectedConversation(user)}>


    <div className='flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer'>

        <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <div>
            <h1 className=' font-bold'>{user.fullname}</h1>
            <span>{user.email}</span>
        </div>
    </div>
    </div>
  );
}

export default User;
