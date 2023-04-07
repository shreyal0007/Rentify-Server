const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 50,
    min: [4, "username should contain at least 4 characters!"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    min: [4, "email should contain at least 4 characters!"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    max: 50,
    min: [4, "password should contain at least 4 characters!"],
    trim: true,
  },
  profession: {
    type: String,
    max: 50,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
    trim: true,
  },
  lastName: {
    default: "",
    type: String,
    trim: true,
  },
  followers: {
    type: Number,
    default: 0,
  },
  linkedin: {
    type: String,
    default: "",
  },
  twitter: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  github: {
    type: String,
    default: "",
  }


});

module.exports = mongoose.model("User", UserSchema);
