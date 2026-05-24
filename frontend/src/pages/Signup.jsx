import React from 'react'
import api from "../service/api.js"
import { useState } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userSignUp = async (e) => {

    e.preventDefault();
    try {
      const response = await api.post(
        "/auth/signup",
        {
          username,
          email,
          password
        }
      )
      login(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.log("Err :", err);
    }
  }

  return (
    <>
      <div className="signup-form">
        <div>
          <h1>
            SignUp page
          </h1>
        </div>
        <form onSubmit={userSignUp}>
          Username :
          <input
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br></br>
          <br></br>
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
    </>
  )
}

export default Signup;