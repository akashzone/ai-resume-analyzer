import React from 'react'
import { useState } from 'react';
import api from "../service/api";

import { useAuth } from "../context/AuthContext.jsx";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
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
      const response = await api.post("/resumes/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
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
      </div>
    </>
  )
}

export default ResumeUpload