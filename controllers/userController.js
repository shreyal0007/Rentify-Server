const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const SECRET_KEY = "1234567890";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({
        status: "fail",
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    const token = jwt.sign(
      { id: newUser._id, email: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(201).json({ user: newUser, token: token });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const getUserDetails = async (req, res) => {
  // try {
  //   const existingUser = await userModel.findOne({ email: email });
  //   if (!existingUser) {
  //     res.status(400).json({
  //       status: "fail",
  //       message: "User not found",
  //     });
  //   }
  //   extract details
  //   const userDetails = {
  //     profession: user.profession || "unknown",
  //     followers: user.followers || 0,
  //   };

  //   res.json(userDetails);
  // } catch (err) {
  //   res.status(400).json({
  //     status: "fail",
  //     message: err,
  //   });
  // }
  try {
    console.log(req.userId);
    const user = await User.findById(req.userId);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "internal server error :)" });
  }

};
const updateUserDetails = async (req, res) => {
  const { username, email, mobile_no } = req.body;
  try {
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const updatePassword = async (req, res) => {
  const { email, newPassword, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    // verify old password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({
        status: "fail",
        message: "Invalid credentials",
      });
    }
    // hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
    // update user's password
    existingUser.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated" });
  } catch {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
module.exports = {
  login,
  register,
  updatePassword,
  getUserDetails,
  updateUserDetails,
};
