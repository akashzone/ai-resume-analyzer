const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken.js");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

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
    console.log("Token :",token);
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
  try {
    const userData = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, userData.password);
    const token = generateToken(userData._id);
    console.log("Token :",token);
    if (userData) {
      if (isMatch) {
        res.status(201).json({
          message: "LoggedIn Successfully",
          user: userData,
          token
        });
      }
    } else {
      res.status(401).json({
        message: "User not exist",
      });
    }
  } catch (err) {
    res.status(401).json({
      message: "Invalid Data",
    });
  }
};

module.exports = { registerUser, loginUser };
