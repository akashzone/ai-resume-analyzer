import React from 'react'
import { useState } from 'react';
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

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
      <div className="container">
        <h1>ResumeUpload Page</h1>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            onChange={(e) => { setFile(e.target.files[0]) }}
          ></input><br></br><br></br>
          <button>Upload Resume</button>
        </form>
        {
          AnalysisId ?
            <form onSubmit={handleAnalysis}>
              <button>Analysis</button>
            </form> : ""
        }
      </div>
    </>
  )
}

export default ResumeUpload