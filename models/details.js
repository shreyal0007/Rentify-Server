const mongoose = require("mongoose");

const detailSchema = new mongoose.Schema({

  image: {
    type: String,
    required: true,
  },
  bedroom:{
    type:String,
    required:true,
    default:"",
  },
  bathroom:{
    type:String,
    required:true,
    default:"",
  },
  hospitals:{
    type:String,
    required:true,
    default:"",
  },
  price: {
    type: String,
    required: true,
    default: "",
    max: 10,
  },
  size: {
    type: String,
    required: true,
    default: "",
  },
  location: {
    type: String,
    required: true,
    default: "",
  },
  email:{
    type:String,
    required:true,
    default:"",
  },
  
});
const Detail = mongoose.model("Detail", detailSchema);
module.exports = Detail;
