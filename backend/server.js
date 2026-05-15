const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require("dotenv").config();

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Root route is working");
});
