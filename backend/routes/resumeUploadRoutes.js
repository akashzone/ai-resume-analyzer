const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const { resumeUpload } = require("../controller/resumeController.js");
const { upload } = require("../utils/multer.js");

router.post("/upload", authMiddleware, upload.single("file"), resumeUpload);

module.exports = router;
