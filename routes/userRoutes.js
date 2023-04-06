const express = require("express");
const userRouter = express.Router();
const {
  register,
  login,
  getUserDetails,
  updatePassword,
  updateUserDetails,
} = require("../controllers/userController");
const authenticateToken = require("../Middleware/authenticateToken");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/userDetails",authenticateToken, getUserDetails);
userRouter.put("/updateUserDetails", updateUserDetails);
userRouter.put("/updatePassword", updatePassword);

module.exports = userRouter;
