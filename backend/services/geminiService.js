require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const key = process.env.GEMINI_SECRET_KEY;
const ai = new GoogleGenAI({ apiKey: key });
const Resume = require("../models/Resume");

async function geminiResponse(resumeID) {
  console.log("Resume Id :", resumeID);
  const resumeData = await Resume.findOne({
    _id: resumeID,
  });
  // console.log("resumeText :",resumeData.extractedText);
  const prompt = resumeData.extractedText;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
    Analyze the following resume and return ONLY a valid raw JSON object. Do not include markdown, explanations, notes, backticks, or any extra text.

Resume:
${prompt}

Return the response in this exact JSON structure:

{
  "atsScore": 0,
  "strengths": [
    ""
  ],
  "weaknesses": [
    ""
  ],
  "missingSkills": [
    ""
  ],
  "suggestions": [
    ""
  ],
  "interviewQuestions": [
    "",
    "",
    "",
    "",
    ""
  ]
}
    `,
  });
  return response.text;
}

module.exports = { geminiResponse };
