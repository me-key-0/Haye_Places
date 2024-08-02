const asyncHandler = require("express-async-handler");
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET /users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

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
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, city } = req.body;
  console.log("cu");

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

    //Hash password

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    //register/create a user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      city,
    });

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
    res.status(500).json({ error: "Server error" });
  }
});

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
    const user = await User.findByIdAndDelete(_id);
    if (user) {
      res.json({
        message: "User Deleted successfully!",
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  //Check for empty fields
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(201);
    throw new Error("All fields are mandatory");
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
      res.status(401);
      throw new Error("username or password is invalid");
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
  console.log(password);
  try {
    const hashedP = await bcrypt.hash(password, 10);
    console.log(hashedP);
    const user = await User.findByIdAndUpdate(_id, { password: hashedP });
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

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  currentUser,
  updatePassword,
  isUser,
  isAdmin,
};
