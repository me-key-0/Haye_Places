const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  currentUser,
} = require("../controllers/userController");

// desc @create/register Users
// route @POST /users
// access-level @user, superadmin
router.route("/register").post(createUser);

// desc @login a User
// route @POST /users/login
// access-level @user, superAdmin
router.route("/login").post(loginUser);

// desc @current User info
// route @GET /users/current
// access-level @user, superAdmin
router.route("/current").get(currentUser);
// router.get("/current", validateToken, currentUser);

// desc @get a User
// route @GET /users/:id
// access-level @user,superAdmin
router.route("/:id").get(getUserById);

// desc @update a User
// route @PUT /users/:id
// access-level @user, superAdmin
router.route("/:id").put(updateUser);

// desc @delete a User
// route @DELETE /users/:id
// access-level @user, superAdmin
router.route("/:id").delete(deleteUser);

// desc @get All Users
// route @GET /users
// access-level @superAdmin
router.route("/").get(getAllUsers);

module.exports = router;
