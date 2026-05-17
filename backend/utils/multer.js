
const path = require("path");

const multer  = require('multer')
const url = path.join(__dirname,"uploads","resumes");
console.log(url)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "uploads", "resumes"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage });

module.exports = { upload };