const errorHandler = require("./errorHandler");
const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  let token = req.cookies.access_token; // Check for token in cookies

  // If token is not found in cookies, check local storage
  if (!token && req.headers.authorization) {
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader.split(" ")[1];
    token = tokenFromHeader;
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
