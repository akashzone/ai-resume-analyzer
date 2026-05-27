import React from 'react'
import AnalysisCard from "../components/AnalysisCard"
import { useState, useEffect } from "react";
import api from "../service/api.js"
const HistoryPage = () => {

  const [history, setHistory] = useState([]);
  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await api.get(
          "/analysis/history"
        )
        setHistory(response.data.insights)
        console.log("Response :", response.data);
        console.log("History :",response.data.insights);
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    }
    getHistory();
  }, [])

  if (!history) {
    return <p className="loading">Loading dashboard...</p>;
  }

  return (
    <>

      <div className="history-container">
      {history.map((item) => (
        <AnalysisCard
          key={item._id}
          resumeName={item.resumeId.originalName}
          atsScore={item.atsScore}
          date={item.createdAt}
          analysisId={item._id}
        />
      ))}
      </div>
    </>
  )
}

export default HistoryPage