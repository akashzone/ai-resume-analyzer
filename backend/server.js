const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config()

const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const main = async () => {
  await mongoose.connect(URI);
};

try {
  main()
    .then(() => {
      console.log("MongoDB - Connected Successfull");
    })
    .catch((err) => console.log(err));

  app.use(express.json());

  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
} catch (err) {
  console.log("Err :", err);
}

app.get("/", (req, res) => {
  res.send("Root route is working");
});