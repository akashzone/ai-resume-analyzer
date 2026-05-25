import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from "react-router-dom";
import  api  from "../service/api";

const AnalysisPage = () => {
  const { resumeId } = useParams();
  const [analysis,setAnalysis] = useState("");

  useEffect(()=>{
    const getReport = async ()=>{
      try{
      const response = await api.post(
        `/analysis/${resumeId}`
      );
      console.log("Response :",response.data);
      setAnalysis(response.data);
      }catch(err){
        console.log(err.response?.data || err.message);
      }
    }
    getReport();
  },[resumeId]);
  return (
    <div>
        <h1>Report page</h1>
        <span>{resumeId}</span>
        {analysis ? (
        <pre>{JSON.stringify(analysis, null, 2)}</pre>
      ) : (
        <p>Loading report...</p>
      )}
    </div>
  )
}

export default AnalysisPage