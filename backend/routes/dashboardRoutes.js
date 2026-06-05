const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware.js");
const dashboardSummary = require("../controller/dashboardController.js")

router.get("/summary", authMiddleware,dashboardSummary);

module.exports = router;
