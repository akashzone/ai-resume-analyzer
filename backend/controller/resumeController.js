const Resume = require("../models/Resume");
const extractTextFromPDF = require("../utils/pdfParser.js");

const resumeUpload = async (req, res) => {
  const { originalname, filename, destination, size } = req.file;
  const filePath = req.file.path;
  const fileUrl = `http://localhost:8080/uploads/resume/${req.file.filename}`;
  const userId = req.user.id;

  try {
    if (!req.file) {
      console.log(
        "File not uploaded."
      )
      return res.status(401).json({
        message: "File not uploaded.",
      });
    }

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
    return res.status(201).json({ success: true, message: "Resume uploaded successfully",resumeDetails:saveFile });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: `Err : ${err}`,
    });
  }
};

module.exports = { resumeUpload };
