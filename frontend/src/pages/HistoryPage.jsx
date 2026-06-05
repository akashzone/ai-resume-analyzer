import AnalysisCard from "../components/AnalysisCard"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api.js"

const HistoryPage = () => {
  const [history, setHistory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await api.get("/analysis/history");
        setHistory(Array.isArray(response.data.insights) ? response.data.insights : []);
        console.log("Response :", response.data);
      } catch (err) {
        console.log(err.response?.data || err.message);
        setHistory([]);
      }
    };
    getHistory();
  }, []);

  if (history === null) {
    return (
      <div className="loading-container">
        <p className="loading">Loading analysis history...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="empty-history-container">
        <h2>No History Found</h2>
        <p>You haven't analyzed any resumes yet. Upload a resume to get started!</p>
        <button onClick={() => navigate("/upload")} className="upload-btn">
          Upload Resume
        </button>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h1 className="history-title">Analysis History</h1>
      <div className="history-grid">
        {history.map((item) => (
          <AnalysisCard
            key={item._id}
            resumeName={item.resumeId?.originalName || "Unnamed Resume"}
            atsScore={item.atsScore}
            date={item.createdAt}
            analysisId={item._id}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;