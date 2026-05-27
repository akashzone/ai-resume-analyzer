import React from 'react'
import { useState } from 'react';
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/ResumeUpload.css";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [AnalysisId, setAnalysisId] = useState("");
  const { token } = useAuth();
  const handleUpload = async (e) => {

    e.preventDefault();
    if (!file) {
      console.log("Please select a file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await api.post("/resumes/upload", formData);
      console.log("ID: ", response.data.resumeDetails._id);
      setAnalysisId(response.data.resumeDetails._id);
      console.log(response.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  const handleAnalysis = (e) => {
    e.preventDefault();
    return navigate(`/analysis/${AnalysisId}`);
  }
  return (
    <>
      <div className="upload-container">

        <h1 className="upload-title">
          Upload Your Resume
        </h1>

        <p className="upload-subtitle">
          Upload your resume and get AI-powered ATS analysis,
          strengths, weaknesses, missing skills, and interview questions.
        </p>

        <form onSubmit={handleUpload}>

          <div className="upload-box">

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            {file && (
              <p className="file-name">
                Selected File: {file.name}
              </p>
            )}

          </div>

          <button className="upload-btn">
            Upload Resume
          </button>

        </form>

        {AnalysisId && (
          <div className="analysis-wrapper">

            <button
              className="analysis-btn"
              onClick={handleAnalysis}
            >
              View Analysis
            </button>

          </div>
        )}

      </div>
    </>
  )
}

export default ResumeUpload