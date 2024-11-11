const mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




// مدل آیتم‌های سبد خرید
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // ارتباط با مدل محصول
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersproduct", // ارتباط با مدل کاربر
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
}); // از ساختن _id جداگانه برای هر آیتم جلوگیری می‌کند



// مدل سبد خرید
const basketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersproduct", // ارتباط با مدل کاربر
    required: true
  },
  items: [cartItemSchema], // لیستی از آیتم‌های سبد خرید
  totalPrice: {
    type: Number,
    required: false,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'], // وضعیت سبد خرید
    default: 'pending'
  },
  ordercretae: {
    type: Date,
    default: Date.now
  },
  orderRecive: {
    type: String
  }
});

// متد برای محاسبه قیمت کل سبد خرید
basketSchema.methods.calculateTotalPrice = function() {
  this.totalPrice = this.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};



// مدل آیتم‌های علاقمندی
const wishlistItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // ارتباط با مدل محصول
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersproduct", // ارتباط با مدل کاربر
    required: true
},

  addedDate: {
    type: Date,
    default: Date.now
  }
}); 
// مدل علاقمندی‌ها
// const wishlistSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "usersproduct",
//     required: true
//   },
//   items: [wishlistItemSchema], 
// });






const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
isaccept:{
  type: Boolean,
  required: false,
 
},
  phone:{
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

  comment: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
   }]
    ,
    natioancode:{
      type: String,
      required: false,
      trim:true,
      default:"0"
    
    },
    
    birthDate:{
      type: String,
      required: false,
      trim:true,
      default:"0"

    },
    
    ibn:{
      type: String,
      required: false,
      trim:true,
      default:"0"

    
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: false
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        required: false,
        index: '2dsphere',

      }
    },
    address: { // فیلد جدید برای آدرس
      type: String,
      required: false,
      default:"tehran"

    },

  basket:basketSchema?basketSchema:[],
  wishlist: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wishlistproduct"
 }],
 items: [wishlistItemSchema], 

});

schema.methods.generateAuthToken = function () {
  const data = {
    _id: this._id,
    role: "user",
    name:this.name,
    email:this.email,
    phone:this.phone,
 basket:this.basket,
 comment:this.comment

  };

  return jwt.sign(data, config.get('jwtPrivateKey'),{expiresIn: "24h"});
};

const Userschema = mongoose.model("usersproductnew", schema);
const Wishlist = mongoose.model("Wishlistproductnew", wishlistItemSchema);
const Iitembasket = mongoose.model("Iitembasket", cartItemSchema);
const Basketfull=mongoose.model("basketFull", basketSchema);



module.exports = {Userschema,Wishlist,Iitembasket,Basketfull};