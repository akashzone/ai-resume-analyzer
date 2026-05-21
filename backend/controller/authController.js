const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken.js");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    const alreadyExist = await User.findOne({ email });

    if (alreadyExist) {
      return res.status(409).json({
        message: "User already exists, Login!",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userData = new User({
      username,
      email,
      password: hashPassword,
    });

    await userData.save();

    const token = generateToken(userData._id);
    res.status(201).json({
      message: "Registered Successfully.",
      user: {
        id: userData._id,
        username: userData.username,
        email: userData.email,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error occurred",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const userData = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, userData.password);
    const token = generateToken(userData._id);
    console.log("Token :", token);
    if (userData) {
      if (isMatch) {
        res.status(201).json({
          message: "LoggedIn Successfully",
          user: userData,
          token,
        });
      }
    } else {
      res.status(401).json({
        message: "User not exist",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Invalid Data",
    });
  }
};

module.exports = { registerUser, loginUser };
