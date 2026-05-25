import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from "../service/api";

import "../styles/AnalysisPage.css";

const AnalysisPage = () => {
  const { resumeId } = useParams();
  const [analysis, setAnalysis] = useState("");

  useEffect(() => {
    const getReport = async () => {
      try {
        const response = await api.post(
          `/analysis/${resumeId}`
        );
        console.log("Response :", response.data);
        setAnalysis(response.data.insights);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    }
    getReport();
  }, [resumeId]);
  return (
    <div className="report-container">
      <h1 className="report-title">
        Resume Analysis Report
      </h1>

      <div className="score-card">
        <h2>ATS Score</h2>
        <p>{analysis.atsScore}</p>
      </div>

      <div className="section">
        <h2>Strengths</h2>

        <ul>
          {analysis.strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Weaknesses</h2>

        <ul>
          {analysis.weaknesses.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Missing Skills</h2>

        <ul>
          {analysis.missingSkills.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Suggestions</h2>

        <ul>
          {analysis.suggestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Interview Questions</h2>

        <ul>
          {analysis.interviewQuestions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AnalysisPage