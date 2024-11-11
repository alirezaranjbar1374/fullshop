const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const moment = require('jalali-moment');
const schemeComment = new mongoose.Schema({
  user: { type: String, required: true },
  text: { type: String, required: true },
  score: Number,
});
const schemaVideo=({
  title:{type:String,required:true},
  video:{type:String,required:true},
  teacher:{type:String,required:true},
  indexvideo:{type:Number},
  timeVideo:{type:Number,required:true},
  coursename:{type:String},
  date:{
    type:String,
    required: true,

    default:moment(new Date()).locale("fa").format("YYYY/MM/DD HH:mm:ss")
    

  }
})
  const schemeCourse = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      teacherAdmin: {
        type: String,
        // required: true,
      },
      price: { type: Number, required: true },
      timeCourse: {
        type: Number,
        required: true,
      },
    
      score: {
        type: Number,
        default: 0,
      },
    
    
      pic:{
        type: String,
      },
      comment: [schemeComment],
      video:[schemaVideo],
      userstudent: {
        type: Number,
      }
  });

const schemaAllteacher = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
  date:{
    type:String,
    required: true,

    default:moment(new Date()).locale("fa").format("YYYY/MM/DD HH:mm:ss")
    

  },
  
  comment: [schemeComment],
  userstudent: {
    type: Number,
  },
  score: {
    type: Number,
    default: 0,
  },
  pic: String,
  course: [schemeCourse],
  adminUsername: { type: String, required: true },
  adminPassword: { type: String, required: true },
});

schemaAllteacher.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
    username: this.adminUsername,
    role: "teacher",
  };

  return jwt.sign(data, config.get('jwtPrivateKey'));
};

const model = mongoose.model("Allteacher", schemaAllteacher);

module.exports = model;
