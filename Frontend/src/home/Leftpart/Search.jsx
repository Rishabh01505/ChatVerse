import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
//download from react-hot-toast. npm install react-hot-toast
/*
daisyUi - for components.
searchbar jsx copied from daisyui website.
search icon taken from react icons npm website and react icons github page.
classname - flex is used to keep two components in same line.
w-width, py/px - padding. hover - background on search icon hovering
label - searchbar, button - search button
*/
function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (
  <div className='h-[10vh]'>
  <div className='px-6 py-4'>
      <form onSubmit={handleSubmit}>
        <div className='flex space-x-3'>
        <label className="border-[1px] rounded-lg p-3 border-gray-700 bg-slate-900 flex items-center gap-2 w-[80%]">
  <input type="text" className="grow outline-none bg-transparent" placeholder=" Search"  value={search}
                onChange={(e) => setSearch(e.target.value)}/></label>
    <button><FaSearch className='text-5xl p-2 hover:bg-gray-600 rounded-full duration-300'/></button>
        </div>
      </form>
    </div>

  </div>
  );
}

export default Search;
