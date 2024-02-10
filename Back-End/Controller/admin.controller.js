const Admin = require("../Models/admin.model.js");
const errorHandler = require("../Utils/errorHandler.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vijay.r20799@gmail.com",
    pass: "cetr ghcn azyg wpgy",
  },
});
const generateRandomString = () => crypto.randomBytes(20).toString("hex");

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
    const verificationToken = generateRandomString();
    const hashedpassword = bcrypt.hashSync(password, 10);
    const addnewadmin = new Admin({
      username,
      email,
      password: hashedpassword,
      verificationToken,
    });
    await addnewadmin.save();
    const verificationLink = `http://localhost:5173/verify/${addnewadmin._id}/${verificationToken}`;

    const mailOptions = {
      from: "vijay.r20799@gmail.com",
      to: email,
      subject: "Account Verification",
      text: `Click the following link to verify your account: ${verificationLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: error.toString() });
      }

      res.status(200).json({ result: "Verification email sent" });
    });
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
      return next(errorHandler(404, "User Not Found"));
    }
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
    if (findadminexists.isVerified == false) {
      const verificationLink = `http://localhost:5173/verify/${findadminexists._id}/${findadminexists.verificationToken}`;

      const mailOptions = {
        from: "vijay.r20799@gmail.com",
        to: email,
        subject: "Account Verification",
        text: `Click the following link to verify your account: ${verificationLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          return res.status(500).json({ error: error.toString() });
        }
      });

      return next(
        errorHandler(404, "user is Unverified, verification sent to your mail")
      );
    }

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
const updateRouter = async (req, res, next) => {
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
    console.log("hiii")
  
    res.clearCookie("access_token");
    res.status(200).json("logout successfully");
  } catch (error) {
    next(error);
  }
};
const reset_password = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Admin.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const resetToken = generateRandomString();
    user.resetToken = resetToken;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${user._id}/${resetToken}`;

    const mailOptions = {
      from: "vijay.r20799@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `Click the following link to reset your password: ${resetLink}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: error.toString() });
      }

      res.status(200).json({ message: "Email sent", response: info.response });
    });
  } catch (error) {
    console.error("Reset password error:", error);
    next(error);
  }
};
const newpasswordchange = async (req, res, next) => {
  try {
    const user = await Admin.findById({ _id: req.params.id });

    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    const newPassword = req.body.newPassword;

    if (!newPassword) {
      return next(errorHandler(400, "New password not provided"));
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    // Update user password in the database
    user.password = hashedPassword;
    await user.save();

    // Respond with success message or any relevant data
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    next(error);
  }
};
const verifyUser = async (req, res, next) => {
  const { id, token } = req.params;

  const user = await Admin.findById(id);
  console.log("user", user);
  if (!user) {
    return next(errorHandler(404, "User not found"));
  }
  if (user.verificationToken !== token) {
    return next(errorHandler(404, "Token Is Not Valid"));
  }

  res.status(200).json(user);
};
const verificationstatus = async (req, res, next) => {
  const { id, token } = req.params;

  const user = await Admin.findById(id);
  console.log("user status", user);

  if (!user) {
    return next(errorHandler(404, "User not found"));
  }
  if (user.verificationToken !== token) {
    return next(errorHandler(404, "Token Is Not Valid"));
  }
  user.isVerified = true;
  await user.save();
  const jwttoken = jwt.sign({ id: user._id }, process.env.JWT_KEY);
  const { password: pass, ...rest } = user._doc;

  res
    .cookie("access_token", jwttoken, { httpOnly: true })
    .status(200)
    .json(user);
};

module.exports = {
  signupRouter,
  loginRouter,
  updateRouter,
  logoutRouter,
  reset_password,
  newpasswordchange,
  verifyUser,
  verificationstatus,
};
