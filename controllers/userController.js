const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Detail = require("../models/details");
// const SECRET_KEY = "1234567890";

const register = async (req, res) => {
  const { username, email, password ,number} = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({
        status: "fail",
        success: false,
        message: "User already exists",
      });
    }
    else{ const hashPassword = await bcrypt.hash(password, 10);
      console.log("tesst")

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      number:number
    });
    console.log("qwerty")
    const token = jwt.sign(
      { id: newUser._id, email: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(201).json({ user: newUser, token: token, success:true });}
   
  } catch (err) {
    res.status(400).json({
      status: "fail",
      success: false,
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
        success: false,
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
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(existingUser._id.toString(), process.env.ACCESS_TOKEN_SECRET);
    console.log(token)
    console.log(existingUser)
    res.status(200).json({ user: existingUser, token: token, success:true });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "fail",
      message: err,
      success:false
    });
  }
};
const getDetailByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const details = await Detail.find({ email });
    res.status(200).json({ details });
  }
  catch (err) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: err,
    });
  }
}

const getSellerDetailsByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const details = await User.find({ email });
    res.status(200).json({ details });
  }
  catch (err) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: err,
    });
}
}
const getDetailById = async (req, res) => {
  const { _id } = req.body;
  try {
    const details = await Detail.find ({ _id });
    res.status(200).json({ details });
  }
  catch (err) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: err,
    });
}
}
const updatedetails = async (req, res) => {
  const { id } = req.params;
  const { image, bedroom,bathroom,hospitals, price, size, location, email } = req.body;

  try {
    const updatedDetail = await Detail.findByIdAndUpdate(
      id,
      { image, bedroom,bathroom,hospitals, price, size, location, email },
      { new: true, runValidators: true }
    );

    if (!updatedDetail) {
      return res
        .status(404)
        .json({ status: "fail", message: "Detail not found" });
    }

    res
      .status(200)
      .json({ detail: updatedDetail, message: "Details updated successfully" });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteDetail = async (req, res) => {
  const{_id} = req.body;
  try {
    const details = await Detail.findByIdAndDelete({_id});
    res.status(200).json({ details });
  }
  catch (err) {
    res.status(400).json({
      status: "fail",
      success: false,
      message: err,
    });
}
}
const postdetails = async (req, res) => {
  const { image, bedroom,bathroom,hospitals, price, size, location,email } = req.body;
  try {
    const newDetail = new Detail({
      image,
      bedroom,
      bathroom,
      hospitals,
      price,
      size,
      location,
      email,
    });
    await newDetail.save();
    res
      .status(200)
      .json({ detail: newDetail, message: "Details saved successfully" });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const getPropertyDetails = async (req, res) => {
  try {
    const details = await Detail.find();
    res.status(200).json({ details });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

module.exports = {
  login,
  register,
  postdetails,
  getPropertyDetails,
  getDetailByEmail,
  updatedetails,
  deleteDetail,
  getDetailById,
  getSellerDetailsByEmail
};
