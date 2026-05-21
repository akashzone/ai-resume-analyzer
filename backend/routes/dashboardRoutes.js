const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const dashboardSummary = require("../controller/dashboardConroller.js")

router.get("/summary", authMiddleware,dashboardSummary);

module.exports = router;
