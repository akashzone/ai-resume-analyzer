const Analysis = require("../models/Analysis");
const Resume = require("../models/Resume");

const dashboardSummary = async (req, res) => {
  const { id } = req.user;
  try {
    const analysisInsights = await Analysis.find({ userId: id });
    const analysisCount = analysisInsights.length;
    const resumes = await Resume.find({ userId: id }).sort({ createdAt: -1 });
    const resumeCount = resumes.length;
    let avg = 0;
    for (let i = 0; i < analysisInsights.length; i++) {
      let element = analysisInsights[i].atsScore;
      avg = element + avg;
    }
    const averageATSScore = avg / analysisInsights.length;
    console.log(" Average ATS score :", averageATSScore);

    const latestAnalysis = {
      atsScore: analysisInsights[0].atsScore,
      createdAt: analysisInsights[0].createdAt.toISOString().split("T")[0]
    };
    res.status(201).json({
      success: true,
      summary: {
        totalResumes: resumeCount,
        totalAnalyses: analysisCount,
        averageATSScore: averageATSScore,
        latestAnalysis,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
};

module.exports = dashboardSummary;
