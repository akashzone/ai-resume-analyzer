const Resume = require("../models/Resume");

const resumeUpload = async(req, res) => {
  const { originalname, filename, destination, size } = req.file;

  const fileUrl = `http://localhost:8080/uploads/resume/${req.file.filename}`;
//   console.log(req.user);
  const userId = req.user.id;

  try {
    if (!req.file) {
      return res.status(401).json({
        message: "upload the file.",
      });
    }
    const uploadFile = new Resume({
      userId,
      fileUrl,
      originalName: originalname,
      fileName: filename,
      filePath: destination,
      fileSize: size,
    });
    // console.log("uploadFile metadata :",uploadFile);
    await uploadFile.save();
    return res.status(201).json({
      message: "Successfully uploaded",
    });
  } catch (err) {
    return res.status(401).json({
        message : `Err : ${err}`
    });
  }
};

module.exports = { resumeUpload };
