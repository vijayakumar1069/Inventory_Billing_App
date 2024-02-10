const errorHandler = require("./errorHandler");
const jwt = require("jsonwebtoken");

const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(req.cookies.access_token)
  console.log(token)
  if (!token) {
    return next(errorHandler(404, "unauthorized Token provided"));
  }
  const user =  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return next(errorHandler(404, "forbiden Error"));
    }
    req.user = user;
    next();
  });
};
module.exports=verifyAdmin;
