const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
