const Resume = require("../models/Resume");
const extractTextFromPDF = require("../utils/pdfParser.js");

const resumeUpload = async (req, res) => {
  try {
    if (!req.file) {
      console.log("File not uploaded.");
      return res.status(400).json({
        success: false,
        message: "File not uploaded.",
      });
    }

    const { originalname, filename, destination, size } = req.file;
    const filePath = req.file.path;
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/resumes/${filename}`;
    const userId = req.user.id;

    const extractText = await extractTextFromPDF(filePath);
    const uploadFile = new Resume({
      userId,
      fileUrl,
      originalName: originalname,
      fileName: filename,
      filePath: destination,
      fileSize: size,
      extractedText: extractText,
    });
    const saveFile = await uploadFile.save();
    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully",
      resumeDetails: saveFile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Err : ${err.message || err}`,
    });
  }
};

module.exports = { resumeUpload };
