import React from 'react'
import {useNavigate} from "react-router-dom"

const Dashboard = () => {
  const navigate = useNavigate();
  const handleSubmit = ()=>{
    return navigate("/upload");
  }
  return (
    <> 
    <div className="container">
      <p>Welcome Back,<b>Akash</b></p>
      <span className="options"> Total Resumes</span>
      <span className="options"> Avg ATS</span>
      <span className="options"> Analysis</span>
      <form onSubmit={handleSubmit}>
      <button className="upload-btn">Upload</button>
    </form>
    </div>
    </>
  )
}

export default Dashboard