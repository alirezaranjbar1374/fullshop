const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');

const basketSchema=new mongoose.Schema({
  teacherId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"course"
  },
  teacherName:String,
  course:[
    {
      name:String,
      courseId:String,
      price:Number
    }
  ]
  

  
})

const schema = new mongoose.Schema({
  user: {
  _id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  email:{
    type: String,
 

  }
  },

  basket:basketSchema,
  paymentCode:  String,
  success:{
      type:Boolean,
      default:false

  },
  refId:Number,
  amount:Number
  
});



const model = mongoose.model('payment', schema);

module.exports = model;
