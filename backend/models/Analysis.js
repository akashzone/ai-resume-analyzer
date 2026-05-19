const mongoose = require("mongoose");
const analysisSchema = new mongoos.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  atsScore: {
    type: Number,
    required: true,
  },
  strengths: {
    type: String,
    required: true,
  },
  weaknesses: {
    type: String,
    required: true,
  },
  missingSkills: {
    type: String,
    required: true,
  },
  suggestions: {
    type: String,
    required: true,
  },
  interviewQuestions: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Analysis = mongoose.model("Analysis",analysisSchema);

module.exports = Analysis;