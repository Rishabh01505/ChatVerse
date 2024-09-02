
import React, {useEffect, useState} from 'react'
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers]=useState([]);

  //load chats if they already exist
  const [loading, setLoading]=useState(false);

  //call backend api
  useEffect(()=>{
    const getUsers=async()=> {
        setLoading(true);
        try {
            //get jwt
            const token = Cookies.get("jwt");
            const response = await axios.get("/api/user/allusers",{
                credentials:"include",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            setAllUsers(response.data);
            setLoading(false);
        } catch (error){
            console.log("Error in useGetAllUsers: " + error);
        }
    };
    getUsers();
}, []);
return[allUsers,loading];
}

export default useGetAllUsers;
