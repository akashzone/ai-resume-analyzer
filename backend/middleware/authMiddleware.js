const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }
  const token = header.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is empty!",
      });
    }
    const decode = await jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
