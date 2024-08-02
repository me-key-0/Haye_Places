const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const validateToken = asyncHandler(async (req, res, next) => {
  if (req.cookies && req.cookies.accessToken) {
    const accessToken = req.cookies.accessToken;
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    res.locals.user = await User.findOne({ email: decoded.user.email });
    if (!res.locals.user) {
      return res.status(401).json({
        message: "User not authorized",
      });
    }
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized: Access token missing" });
  }
});

module.exports = validateToken;
