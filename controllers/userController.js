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
    else{ const hashPassword = await bcrypt.hash(password, 10);
      console.log("tesst")

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    console.log("qwerty")
    const token = jwt.sign(
      { id: newUser._id, email: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(201).json({ user: newUser, token: token });}
   
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {console.log(email)
    const existingUser = await User.findOne({ email: email });
    console.log(existingUser);
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
    const token = jwt.sign(existingUser._id.toString(), process.env.ACCESS_TOKEN_SECRET);
    console.log(token)
    console.log(existingUser)
    res.status(200).json({ user: existingUser, token: token });
  } catch (err) {
    console.log(err)
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
  try {
    const user = await User.findByIdAndUpdate(req.userId, {
      $set: req.body,
    });
    console.log(req.bod)
    const newUser = await User.findById(user._id);
    console.log(newUser)
    return res.status(200).json({
      token: jwt.sign(newUser._id.toString(), process.env.ACCESS_TOKEN_SECRET),
      username: newUser.username,
      github: newUser.github,
      phone: newUser.phone,
      linkedin: newUser.linkedin,
      twitter: newUser.twitter,
      facebook: newUser.facebook,
      website: newUser.website,
      instagram: newUser.instagram,
      phoneNumber: newUser.phoneNumber,
      followers: newUser.followers,
      profession: newUser.profession,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const updatePassword = async (req, res) => {
  
  try {
    const { password, newPassword } = req.body;
    // find user by id
    console.log(req.body)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({message:"User not found",success:false});
    }
     console.log(user)
    // compare current password with provided old password
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({message:"Invalid old password",success:false});
    }
    console.log(isPasswordMatch)
    // hash and save new password
    const newPassword1 = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(
      user._id,
      { password: newPassword1 },
      { new: true }
    );
    await user.save();

    res.status(200).json({message:"Password updated successfully",success:true});
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// const updatePassword = async (req, res) => {
//   try {
//     const { password, newpassword } = req.body;
//      const user = await User.findById(req.userId);
//      if (!user) {
//        return res.status(404).json({message:"User not found",success:false});
//     }
//     const verified = await bcrypt.compare(password, user.password);
//     if (verified) {
//       const hashed = await bcrypt.hash(newpassword, 10);
//       await User.findByIdAndUpdate(
//         user._id,
//         { password: hashed },
//         { new: true }
//       );
//       res
//         .status(200)
//         .json({ success: true, message: "Password Changed Successfully" });
//     } else {
//       throw new Error({ message: "Wrong Password", success: false });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error", success: false });
//   }
// };

module.exports = {
  login,
  register,
  updatePassword,
  getUserDetails,
  updateUserDetails,
};
