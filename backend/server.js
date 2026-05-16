const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

require("dotenv").config();

app.use(express.json());


const authRoutes = require("./routes/authRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const authMiddleware = require("./middleware/authMiddleware.js")

const mongoose = require("mongoose");
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
app.use("/api/protected",authMiddleware,profileRoutes)
