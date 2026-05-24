const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return next(new Error("No token found"));
  }
  const token = header.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({
        message: "Token is empty !",
      });
    }
    const decode = await jwt.verify(token, JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    throw new Error("Invalid token");
  }
};

module.exports = authMiddleware;
