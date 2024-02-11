const errorHandler = require("./errorHandler");
const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  // If token is not found in cookies or local storage, return an error
  if (!token) {
    return next(errorHandler(404, "Unauthorized token provided"));
  }

  try {
    // Verify the token using the JWT library
    const user = jwt.verify(token, process.env.JWT_KEY);

    // If verification is successful, attach user information to the request
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return next(errorHandler(404, "Forbidden error"));
  }
};

module.exports = verifyAdmin;
