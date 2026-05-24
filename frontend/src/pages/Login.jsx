import React from 'react'
import api from "../service/api.js"
import { useState } from 'react';
import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const userLogin = async (e) => {
    
    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      )
      console.log("Response :", response.data);
      login(response.data.token,response.data.user); //function that stores the token and user data in LocalStorage.
      navigate("/dashboard");
    } catch (err) {
      console.log("Err :", err);
    }
  }
  return (
    <div><div>
          <h1>
            Login page
          </h1>
        </div>
        <form onSubmit={userLogin}>
          Email :
          <input
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <br></br>
          Password :
          <input
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          <br></br>
          <button>
            Submit
          </button>
        </form>
      </div>
  )
}

export default Login