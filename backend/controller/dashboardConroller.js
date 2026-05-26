const Analysis = require("../models/Analysis");
const Resume = require("../models/Resume");

const dashboardSummary = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User id missing.",
      });
    }

    const analyses = await Analysis.find({ userId: id }).sort({
      createdAt: -1,
    });

    const resumes = await Resume.find({ userId: id }).sort({
      createdAt: -1,
    });

    if (analyses.length === 0 && resumes.length === 0) {
      return res.status(200).json({
        success: true,
        summary: {
          totalResumes: 0,
          totalAnalyses: 0,
          averageATSScore: 0,
          latestAnalysis: null,
          message: "Upload your first resume to see analytics.",
        },
      });
    }

    let totalATS = 0;

    for (let i = 0; i < analyses.length; i++) {
      totalATS += analyses[i].atsScore || 0;
    }

    const averageATSScore =
      analyses.length > 0 ? Math.round(totalATS / analyses.length) : 0;

    const latestAnalysis =
      analyses.length > 0
        ? {
            id: analyses[0]._id,
            atsScore: analyses[0].atsScore,
            createdAt: analyses[0].createdAt.toISOString().split("T")[0],
          }
        : null;

    res.status(200).json({
      success: true,
      summary: {
        totalResumes: resumes.length,
        totalAnalyses: analyses.length,
        averageATSScore,
        latestAnalysis,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = dashboardSummary;