
const express = require("express");
const router = express.Router();

const { getProfile } = require("../controller/profileController");
const authMiddleware = require("../middleware/authMiddleware.js")


router.get("/profile",authMiddleware,getProfile);

module.exports = router;