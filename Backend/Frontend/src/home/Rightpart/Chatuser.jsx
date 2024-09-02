import React from 'react';
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
/* 
space-x-3 - space between icon and status
item center - center along y axis
justify center - center along x-axis
*/
function Chatuser() {
  //to get name of the logged in user
  const { selectedConversation } = useConversation();


  //to show user is online or not
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md">

    <label
      htmlFor="my-drawer-2"
      className="btn btn-ghost drawer-button lg:hidden absolute left-5"
    >
      <CiMenuFries className="text-white text-xl" />
    </label>

    <div className="flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300">

      <div className="avatar online">
        <div className="w-16 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div>
        <h1 className="text-xl">{selectedConversation.fullname}</h1>
        <span className="text-sm">
          {getOnlineUsersStatus(selectedConversation._id)}
        </span>
      </div>
    </div>
  </div>
);
}

export default Chatuser;
