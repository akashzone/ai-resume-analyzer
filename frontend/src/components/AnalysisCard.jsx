import React from "react";
import "../styles/AnalysisCard.css";
import { useNavigate } from "react-router-dom";

const AnalysisCard = ({
  resumeName,
  atsScore,
  date,
  analysisId,
}) => {

  const navigate = useNavigate();

  const handleViewReport = () => {
    navigate(`/analysis/${analysisId}`);
  };

  return (
    <div className="analysis-card">

      <h2 className="resume-name">
        {resumeName}
      </h2>

      <div className="card-details">

        <p>
          <span>ATS Score:</span> {atsScore}%
        </p>

        <p>
          <span>Analysis Date:</span>{" "}
          {new Date(date).toLocaleDateString()}
        </p>

      </div>

      <button
        className="report-btn"
        onClick={handleViewReport}
      >
        View Report
      </button>

    </div>
  );
};

export default AnalysisCard
