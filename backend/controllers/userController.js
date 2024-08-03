const { URLSearchParams } = require("url");
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET /users/:id
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /users
const createUser = async (req, res) => {
  const { username, email, password, city } = req.query;
  try {
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //register/create a user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      city,
      isVerified: true,
    });
    console.log("user");

    if (user) {
      res.status(201).json({
        message: "User registered Successfully",
        id: user._id,
        email: user.email,
      });
    } else {
      res.status(400).json({
        message: "User data is not valid",
      });
      // throw new Error("User data is not valid")
    }

    // console.log(hashedPassword);
  } catch (error) {
    res.status(500).json({
      message: "m Server error",
      error,
    });
  }
};

// PUT /users/:id
const updateUser = async (req, res) => {
  const { _id } = res.locals.user;

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// DELETE /users/:id
const deleteUser = async (req, res) => {
  const { _id } = res.locals.user;

  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    const user = await User.findByIdAndDelete(_id);
    res.json({
      message: "User Deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  //Check for empty fields
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(201).json({
      error: "all fields are mandatory!",
    });
  }

  try {
    //Check if the user exist
    const user = await User.findOne({
      username,
    });

    // compare password with the one in the db(hashed one)
    if (user && (await bcrypt.compare(password, user.password))) {
      // Acces token generation
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );

      // Refresh token generation
      const refreshToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
      );

      // Sending access token to browser Cookie
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 25 * 60 * 1000,
        sameSite: "strict",
      });

      // Sending refresh token to browser Cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(200).json({
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({
        error: "invalid username or password!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logged out succesfully",
  });
};

const updatePassword = async (req, res) => {
  const { _id } = res.locals.user;
  const { password } = req.body;
  try {
    const hashedP = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(
      _id,
      { password: hashedP },
      { new: true }
    );
    res.json({
      message: "it works",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      error: "server error",
    });
  }
};

const isUser = async (req, res, next) => {
  // console.log(res.locals.user);
  const user = await User.findOne({
    username: req.body.username,
  });
  console.log(req.body);
  if (user && user.role === "user") {
    next();
  } else {
    return res.status(403).json({
      message: "Not a user",
    });
  }
};

const isAdmin = (req, res, next) => {
  console.log(res.locals.user);
  if (res.locals.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Not an Admin",
    });
  }
};

const currentUser = async (req, res) => {
  res.json(res.locals.user);
};

const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log(refreshToken);
  if (!refreshToken) {
    res.status(401).json({
      error: "refresh token missing",
    });
  }
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  if (decoded) {
    const user = await User.findById(decoded.id);
    if (user) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 20 * 60 * 1000,
        sameSite: "strict",
      });

      res.status(200).json({
        accessToken: accessToken,
      });
    } else {
      res.status(401).json({
        error: "invalid refresh token",
      });
    }
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      error: "User not found",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email,
    },
    process.env.PASSWORD_RETRIEVAL_TOKEN,
    {
      expiresIn: process.env.PASSWORD_RETRIEVAL_EXPIRY,
    }
  );

  const resetLink = `https://${process.env.HOST}:${process.env.PORT}/resetPassword?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "antwon.mills82@ethereal.email",
      pass: "NvyZzynEAAwJA4JvF4",
    },
  });

  // Send the password reset link to the user's email
  await transporter.sendMail(
    {
      from: '"Antwon Mills" <antwon.mills82@ethereal.email>', // sender address
      to: "me.key.as.24@gmail.com", // receiver address
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Hello world?</b> <br/> <a>${resetLink}<a/>`, // html body
    },
    async (error, info) => {
      if (error) {
        return res.status(500).json({
          message: "Error sending email",
          error,
        });
      }

      user.pwdToken = token;
      // user.passwordReset[expiry] = process.env.PASSWORD_RETRIEVAL_EXPIRY;
      await user.save();
      // const users = await User.findByIdAndUpdate(
      //   user._id,
      //   { passwordReset: token },
      //   { new: true }
      // );
      console.log(user);
      res
        .status(200)
        .json({ message: "Password reset link sent to your email" });
    }
  );
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.query;

  if (!password && !token) {
    res.status(401).json({
      error: "empty password field or no token",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.PASSWORD_RETRIEVAL_TOKEN);
    console.log(decoded);

    const user = await User.findById(decoded.id);
    if (user.pwdToken !== token) {
      console.log("token not similar");
      res.status(401).json({
        message: "invalid token",
      });
    } else {
      console.log("similar token");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      message: "Password reset successfully",
    });

    process.env.PASSWORD_RETRIEVAL_EXPIRY = new Date(0);
  } catch (error) {
    res.status(401).json({
      message: "token expires",
      error,
    });
  }
};

const verifyEmail = async (req, res) => {
  const { username, email, password, city } = req.body;

  //Check for empty fields and throw an error
  if (!username || !email || !password || !city) {
    res.status(400).json({
      message: "All fields are mandatory",
    });
    // throw new Error("All fields are mandatory");
  }

  try {
    //Check if user already registered, and throw an error
    const userAvailable = await User.findOne({
      email,
    });
    if (userAvailable) {
      res.status(400).json({
        message: "User already exist",
      });
    }

    // Generating registration Token
    const token = jwt.sign(
      {
        username,
        email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    console.log(token);
    const registrationLink = `https://${process.env.HOST}:${process.env.PORT}/users/register-verified`;
    // Construct the query parameters string
    const queryParams = new URLSearchParams({
      username,
      email,
      password,
      city,
    });

    // Append the query parameters to the registration link
    const urlWithParams = `${registrationLink}?${queryParams.toString()}`;

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "antwon.mills82@ethereal.email",
        pass: "NvyZzynEAAwJA4JvF4",
      },
    });

    // Send the password reset link to the user's email
    await transporter.sendMail(
      {
        from: '"Antwon Mills" <antwon.mills82@ethereal.email>', // sender address
        to: "me.key.as.24@gmail.com", // receiver address
        subject: "Verify Email ✔", // Subject line
        text: "Email Verification?", // plain text body
        html: `<button><b><a href="${urlWithParams}">Verify-Email<a/></b></button>`, // html body
      },
      async (error, info) => {
        if (error) {
          return res.status(500).json({
            message: "Error sending email",
            error,
          });
        }

        console.log("verified!");
        res.status(200).json({
          message: "User verification email sent",
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

const resendPasswordEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      message: "user not found",
    });
  }

  user.pwdToken = null;

  const token = jwt.sign(
    {
      id: user._id,
      email,
    },
    process.env.PASSWORD_RETRIEVAL_TOKEN,
    {
      expiresIn: process.env.PASSWORD_RETRIEVAL_EXPIRY,
    }
  );

  const resetLink = `https://${process.env.HOST}:${process.env.PORT}/resetPassword?token=${token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "antwon.mills82@ethereal.email",
      pass: "NvyZzynEAAwJA4JvF4",
    },
  });

  // Send the password reset link to the user's email
  await transporter.sendMail(
    {
      from: '"Antwon Mills" <antwon.mills82@ethereal.email>', // sender address
      to: "me.key.as.24@gmail.com", // receiver address
      subject: "Password Reset Request ✔", // Subject line
      text: "Reset your password", // plain text body
      html: `<b>Hello world?</b> <br/> <a>${resetLink}<a/>`, // html body
    },
    async (error, info) => {
      if (error) {
        return res.status(500).json({
          message: "Error sending email",
          error,
        });
      }

      console.log(`pwdToken-before:${user.pwdToken}`);
      user.pwdToken = token;
      await user.save();
      console.log(`pwdToken-after:${user.pwdToken}`);
      res
        .status(200)
        .json({ message: "Password reset link resent to your email" });
    }
  );
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  refreshController,
  currentUser,
  updatePassword,
  forgetPassword,
  resetPassword,
  resendPasswordEmail,
  verifyEmail,
  isUser,
  isAdmin,
};
