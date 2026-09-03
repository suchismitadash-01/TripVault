const jwt = require("jsonwebtoken");

// Verifies the JWT sent in the Authorization header ("Bearer <token>")
// and attaches the decoded user id to req.userId
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid or has expired" });
  }
}

module.exports = authMiddleware;
