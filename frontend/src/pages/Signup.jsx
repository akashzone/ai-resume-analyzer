import api from "../service/api.js"
import { useState } from 'react';
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const Signup = () => {
  const { login } = useAuth();
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
    <div className="signup-container">

      <div className="signup-card">

        <h1 className="signup-title">
          Create Account
        </h1>

        <p className="signup-subtitle">
          Start analyzing your resume with AI-powered insights.
        </p>

        <form onSubmit={userSignUp} className="signup-form">

          <div className="form-group">
            <label>Username</label>

            <input
              value={username}
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <button className="signup-btn">
            Create Account
          </button>

        </form>

      </div>

    </div>
  )
}

export default Signup;