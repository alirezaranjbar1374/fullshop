const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


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
  email: {
    type: String,
    required: true,
    unique:true
  },
  name: {
    type: String,
    required: true,
    trim:true
  },
  password: {
    type: String,
  },

  basket:basketSchema?basketSchema:[]
});

schema.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
    role: "user",
    name:this.name,
    email:this.email,
     basket:this.basket

  };

  return jwt.sign(data, config.get('jwtPrivateKey'));
};
//اگه پس تغغیر داده شده بود میدل ور
// schema.pre("save", function (next) {
//   let user = this;

//   if (!user.isModified("password")) return next();

//   bcrypt.hash(user.password, 10, (err, hash) => {
//       if (err) return next(err);

//       user.password = hash;
//       next();
//   });
// });

const model = mongoose.model('users', schema);

module.exports = model;

