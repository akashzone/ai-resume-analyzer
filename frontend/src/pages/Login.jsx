import React from 'react'
import api from "../service/api.js"
import { useState } from 'react';
import { useAuth } from "../context/AuthContext.jsx"
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

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
      login(response.data.token, response.data.user); //function that stores the token and user data in LocalStorage.
      navigate("/dashboard");
    } catch (err) {
      console.log("Err :", err);
    }
  }
  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Login to continue analyzing resumes with AI insights.
        </p>

        <form onSubmit={userLogin} className="login-form">

          <div className="form-group">

            <label>Email</label>

            <input
              value={email}
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              value={password}
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>

          <button className="login-btn">
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login