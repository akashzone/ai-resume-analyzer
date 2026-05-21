const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

require("dotenv").config();

app.use(express.json());

const authRoutes = require("./routes/authRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const resumeRoutes = require("./routes/resumeUploadRoutes.js");
const analysisRoutes = require("./routes/analysisRoutes.js");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const errorMiddleware = require("./middleware/errorMiddleware");


const mongoose = require("mongoose");
const Analysis = require("./models/Analysis.js");
const dashboardSummary = require("./controller/dashboardConroller.js");
const URI = process.env.MONGODB_URI;

const startServer = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (err) {
    console.log("Err :", err);
  }
};

startServer();

app.get("/api/health", (req, res) => {
  res.send({
    success: true,
    message: "API is healthy",
  });
});

//auth-routes 
app.use("/api/auth",authRoutes);

//protected routes
app.use("/api/protected",profileRoutes)

// resume-upload route
app.use("/api/resumes",resumeRoutes);

// geminiAnalysis route
app.use("/api/analysis",analysisRoutes)

// dashboard - route
app.use("/api/dashboard/",dashboardRoutes);


// error middlelware 
app.use(errorMiddleware);