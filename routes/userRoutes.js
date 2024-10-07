const express = require("express");
const userRouter = express.Router();
const {
  login,
  register,
  getDetailById,
  postdetails,
  getPropertyDetails,
  updatedetails,
  deleteDetail,
  getDetailByEmail,
  getSellerDetailsByEmail
} = require("../controllers/userController");
const authenticateToken = require("../Middleware/authenticateToken");
const Detail = require("../models/details");
userRouter.post("/register", register);
userRouter.delete("/deleteDetail", deleteDetail);
userRouter.put("/updateDetail/:id", updatedetails);
userRouter.post("/getDetailByEmail", getDetailByEmail);
userRouter.post("/getDetailById", getDetailById);
userRouter.post("/getSellerDetailsByEmail", getSellerDetailsByEmail);
userRouter.post("/login", login);
userRouter.post("/postdetails", postdetails);
userRouter.get("/getpropertydetails", getPropertyDetails);

module.exports = userRouter;
