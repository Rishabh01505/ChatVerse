
import React, {useState} from 'react';
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import axios from "axios";
import toast from 'react-hot-toast';
//import { FaSearch } from "react-icons/fa";
/*
daisyUi - for components.
searchbar jsx copied from daisyui website.
search icon taken from react icons npm website and react icons github page.
classname - flex is used to keep two components in same line.
w-width, py/px - padding. hover - background on search icon hovering
label - searchbar, button - search button
*/

function Logout() {
  const [loading, setLoading]=useState(false);
  const handleLogout = async ()=>{
    setLoading(true);
    try {
      const res=await axios.post("/api/user/logout");
      localStorage.removeItem("ChatVerse");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error){
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    }
  };
  return (
    <>
      <hr />
      <div className=" h-[10vh] bg-transparent">
        <div>
          <BiLogOutCircle
            className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
            onClick={handleLogout}
          />
        </div>
      </div>
    </>
  );
}

export default Logout;