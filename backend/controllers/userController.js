const asyncHandler = require("express-async-handler");
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const trial = async (req, res) => {
  try {
    res.json({ info: "some info" });
  } catch (error) {
    res.status(500).json({ error: "m Server error" });
  }
};

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

  //Check for empty fields and throw an error
  if (!username || !email || !password || !city) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  try {
    //Check if user already registered, and throw an error
    const userAvailable = await User.findOne({
      email,
    });
    if (userAvailable) {
      res.status(400);
      throw new Error("User already exist");
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
        id: user._id,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("User data is not valid");
    }

    // console.log(hashedPassword);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /users/:id
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { username, email, password, city } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { username, email, password, city },
      { new: true }
    );
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
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const loginUser = async (req, res) => {
  //CHeck for empty fields
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(201);
    throw new Error("All fields are mandatory");
  }
  console.log("username and password checked");

  try {
    //Check if the user exist
    const user = await User.findOne({
      username,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      // compare password with the one in the db(hashed one)
      console.log(user);
      console.log("password match");
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
          expiresIn: "15m",
        }
      );
      console.log("access token defined");
      res.status(200).json({
        accessToken,
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

const currentUser = async (req, res) => {
  console.log("current info");
  res.json({ info: "info" });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  currentUser,
  trial,
};
