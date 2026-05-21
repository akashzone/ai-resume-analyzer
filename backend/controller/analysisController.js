const { geminiResponse } = require("../services/geminiService.js");
const Analysis = require("../models/Analysis.js");
const analysisController = async (req, res) => {
  const { resumeId } = req.params;
  const { id } = req.user;
  console.log("User id:",req.user.id)
  if (!resumeId) {
    return null;
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
      userId : id,
      atsScore,
      strengths,
      weaknesses,
      missingSkills,
      suggestions,
      interviewQuestions,
    });
    const saveData = await analysisInsights.save();
    console.log("Successfully inserted:", saveData);

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

const analysisHistory = async (req,res)=>{
  const { id } = req.user;
  if(id){
    const insightsHistory = await Analysis.find({userId: id}).sort({ createdAt: -1}).populate("resumeId", "originalName uploadedAt fileSize");
    // console.log("History :",insightsHistory[0]);
    res.status(201).json({
      message : "History retrieved successfully",
      insights : insightsHistory
    });
  }
  else{
    console.log("ID invalid !");
  }
}

const singleAnalysis = async (req,res)=>{
  const { analysisId } = req.params;
  if( analysisId ){
    const insights = await Analysis.findOne({ _id : analysisId}).populate("resumeId", "originalName uploadedAt fileSize");
    console.log("Insights :",insights);
    res.status(201).json({
      message : "Successfully retrieved",
      insight : insights
    });
  }else{
    return res.status(500).json({
      message : "analysisId is invalid.."
    });
  }
}

module.exports = { analysisController, analysisHistory, singleAnalysis };
