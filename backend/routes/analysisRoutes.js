const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const { analysisController,analysisHistory,singleAnalysis } = require("../controller/analysisController.js")

router.get("/history",authMiddleware,analysisHistory);
router.get("/:analysisId",authMiddleware,singleAnalysis)
router.post("/:resumeId", authMiddleware, analysisController);

module.exports = router;
