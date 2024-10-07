const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 50,
    min: [4, "username should contain at least 4 characters!"],
    trim: true,
  },
  number:{
    type:String,
    required:true,
    default:"",
    min:10,
    max:10
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
});

module.exports = mongoose.model("User", UserSchema);
