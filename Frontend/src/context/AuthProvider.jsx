
import React, { createContext, useContext, useState } from 'react';
//localstorage needs to be made global so that user info can be used by us.
import Cookies from "js-cookie";
//on frontend install js-cookie
//on frontend install react router dom npm and follow instructions on the reactrouter website to establish routes. 

export const AuthContext=createContext();
//we want to store both cookies(jwt) and local storage
export const AuthProvider=({children})=> {
    const initialUserState=Cookies.get("jwt") || localStorage.getItem("ChatVerse");
    //parse the user data and store in state.
    const [authUser, setAuthUser] = useState(
        initialUserState ? JSON.parse(initialUserState) : undefined);
        return (
            <AuthContext.Provider value={[authUser, setAuthUser]}>
              {children}
            </AuthContext.Provider>
          );
};
 
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
