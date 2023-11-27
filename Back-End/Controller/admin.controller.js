const Admin = require("../Models/admin.model.js");
const errorHandler = require("../Utils/errorHandler.js");
const bcrypt = require("bcryptjs");

const signupRouter = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler(401, "Must fill all the values"));
  }
  const verify_user_Exsiting = await Admin.findOne({ email });
  if (verify_user_Exsiting) {
    return next(errorHandler(401, "Email already Registered"));
  }
  try {
    const hashedpassword = bcrypt.hashSync(password, 10);
    const addnewadmin = new Admin({
      username,
      email,
      password: hashedpassword,
    });
    await addnewadmin.save();
    const { password: pass, ...rest } = addnewadmin._doc;
    res.status(200).json({rest });
  } catch (error) {
    next(error);
  }
};

module.exports = { signupRouter };
