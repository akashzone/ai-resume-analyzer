import React from 'react'
import { useParams } from "react-router-dom";

const AnalysisPage = (req,res) => {
  const { analysisId } = useParams();
  return (
    <div>
        <h1>Report page</h1>
        <span>{analysisId}</span>
    </div>
  )
}

export default AnalysisPage