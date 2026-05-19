const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const analysisController = require("../controller/analysisController.js")

router.post("/:resumeId", authMiddleware, analysisController);

module.exports = router;
