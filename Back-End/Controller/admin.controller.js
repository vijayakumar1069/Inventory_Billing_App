const Admin = require("../Models/admin.model.js");
const errorHandler = require("../Utils/errorHandler.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signupRouter = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
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
    res.status(200).json({ rest, message: "Register Successfully...." });
  } catch (error) {
    next(error);
  }
};
const loginRouter = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(errorHandler(401, "email and password required"));
    }
    const findadminexists = await Admin.findOne({ email });

    if (!findadminexists) {
      return next(errorHandler(401, "Admin not found"));
    }
    const password_checking = bcrypt.compareSync(
      password,
      findadminexists.password
    );
    if (!password_checking) {
      return next(errorHandler(401, "Wrong Email Or Password"));
    }

    const token = jwt.sign({ id: findadminexists._id }, process.env.JWT_KEY);
    const { password: pass, ...rest } = findadminexists._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
const updateRouter = async (req, res, next) => {
  console.log(req.params.id);
  try {
    if (req.user.id != req.params.id) {
      return next(404, "you can update your account");
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    }
    const updatedetails = await Admin.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedetails._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
const logoutRouter = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("logout successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { signupRouter, loginRouter, updateRouter, logoutRouter };
