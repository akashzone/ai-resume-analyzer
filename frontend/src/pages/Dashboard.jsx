import React from "react";
import api from "../service/api.js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const { user } = useAuth();

  const handleUpload = () => {
    navigate("/upload");
  };

  useEffect(() => {
    const getSummary = async () => {
      try {
        const response = await api.get("/dashboard/summary");
        setSummary(response.data.summary);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    getSummary();
  }, []);

  if (!summary) {
    return <p className="loading">Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <p className="welcome-text">Welcome Back, <b>{user?.username || "User"}</b></p>
          <h1>Dashboard</h1>
        </div>

        <button className="upload-btn" onClick={handleUpload}>
          Upload Resume
        </button>
      </div>

      {summary.message && (
        <div className="empty-box">
          <p>{summary.message}</p>
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <span>Total Resumes</span>
          <h2>{summary.totalResumes}</h2>
        </div>

        <div className="stat-card">
          <span>Total Analyses</span>
          <h2>{summary.totalAnalyses}</h2>
        </div>

        <div className="stat-card">
          <span>Average ATS</span>
          <h2>{summary.averageATSScore}%</h2>
        </div>
      </div>

      <div className="latest-card">
        <h2>Latest Analysis</h2>

        {summary.latestAnalysis ? (
          <>
            <p>ATS Score: <b>{summary.latestAnalysis.atsScore}%</b></p>
            <p>Date: {summary.latestAnalysis.createdAt}</p>
          </>
        ) : (
          <p>No analysis yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;