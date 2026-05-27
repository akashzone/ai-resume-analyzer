import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api.js";
import "../styles/ReportPage.css";

const ReportPage = () => {
  const { analysisId } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const getReport = async () => {
      try {
        const response = await api.get(`/analysis/${analysisId}`);
        console.log("Response: ", response.data);
        setReport(response.data.insight);
      } catch (err) {
        console.log("Error :", err.response?.data || err.message);
      }
    };

    getReport();
  }, [analysisId]);

  if (!report) {
    return <p className="loading">Loading report...</p>;
  }

  return (
    <div className="report-container">
      <h1 className="report-title">Resume Analysis Report</h1>

      <div className="score-card">
        <h2>ATS Score</h2>
        <p>{report.atsScore}%</p>
      </div>

      <div className="resume-info">
        <p><b>Resume:</b> {report.resumeId?.originalName}</p>
        <p><b>Analysis Date:</b> {new Date(report.createdAt).toLocaleDateString()}</p>
      </div>

      <ReportSection title="Strengths" items={report.strengths} />
      <ReportSection title="Weaknesses" items={report.weaknesses} />
      <ReportSection title="Missing Skills" items={report.missingSkills} />
      <ReportSection title="Suggestions" items={report.suggestions} />
      <ReportSection title="Interview Questions" items={report.interviewQuestions} />
    </div>
  );
};

const ReportSection = ({ title, items }) => {
  return (
    <div className="report-section">
      <h2>{title}</h2>
      <ul>
        {items?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportPage;