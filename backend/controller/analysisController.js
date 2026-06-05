const { geminiResponse } = require("../services/geminiService.js");
const Analysis = require("../models/Analysis.js");
const analysisController = async (req, res) => {
  const { resumeId } = req.params;
  const { id } = req.user;
  if (!resumeId) {
    return res.status(400).json({
      message: "resumeId parameter is required",
    });
  }
  try {
    const responseText = await geminiResponse(resumeId);
    const parsed = JSON.parse(responseText);

    const {
      atsScore,
      strengths,
      weaknesses,
      missingSkills,
      suggestions,
      interviewQuestions,
    } = parsed;

    const analysisInsights = new Analysis({
      resumeId,
      userId: id,
      atsScore,
      strengths,
      weaknesses,
      missingSkills,
      suggestions,
      interviewQuestions,
    });
    const saveData = await analysisInsights.save();
    res.status(201).json({
      message: "Successfully saved",
      insights: saveData,
    });
  } catch (err) {
    console.log("Analysis error:", err);

    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
};

const analysisHistory = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) {
      return res.status(401).json({
        message: "User ID invalid or empty!",
      });
    }

    const insightsHistory = await Analysis.find({ userId: id })
      .sort({ createdAt: -1 })
      .populate("resumeId", "originalName uploadedAt fileSize");

    if (insightsHistory.length === 0) {
      return res.status(200).json({
        message: "Upload resume and analyze it to see history",
        insights: [],
      });
    }
    return res.status(200).json({
      message: "History retrieved successfully",
      insights: insightsHistory,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving history",
      error: err.message,
    });
  }
};

const singleAnalysis = async (req, res) => {
  try {
    const { analysisId } = req.params;
    if (!analysisId) {
      return res.status(400).json({
        message: "AnalysisId is Empty",
      });
    }
    const insights = await Analysis.findOne({ _id: analysisId }).populate(
      "resumeId",
      "originalName uploadedAt fileSize",
    );
    if (!insights) {
      return res.status(404).json({
        message: "AnalysisId is Invalid..",
      });
    }
    return res.status(200).json({
      message: "Successfully retrieved",
      insight: insights,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error retrieving analysis details",
      error: err.message,
    });
  }
};

module.exports = { analysisController, analysisHistory, singleAnalysis };
