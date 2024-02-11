// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Get the access_token from the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: No access_token provided" });
  }

  // Extract the token from the "Bearer" scheme
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Invalid access_token format" });
  }

  try {
    // Verify the access_token
    const decoded = jwt.verify(token, process.env.JWT_KEY); // Use the same secret key as used during token generation

    // Attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error during access_token verification:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid access_token" });
  }
};

module.exports = authMiddleware;
