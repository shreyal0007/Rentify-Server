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
userRouter.get("/getuserdetails",authenticateToken, getUserDetails);
userRouter.put("/updateuserdetails", authenticateToken,updateUserDetails);
userRouter.put("/updatepassword", authenticateToken, updatePassword);

module.exports = userRouter;
