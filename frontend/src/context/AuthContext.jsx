

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


export const AuthProvider = ({children})=>{
    const [token,setToken] = useState(localStorage.getItem("token") || null);
    const [user,setUser] = useState(null);

    const login = (token,user)=>{
        setToken(token);
        setUser(user);
        localStorage.setItem("token",token);
        console.log("Save Successfully, token :",token);
    }
    const logout = (token,user)=>{
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        console.log("Successfuly Logout");
    }
    return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}