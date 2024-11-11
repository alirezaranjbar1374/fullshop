
const mongoose = require("mongoose");
const { sub } = require('date-fns-jalali');

const schemaproduct = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    href:{
      type: String,
      required: false,
    },


    coverasli: {
        type: String,
        required: false,
      },
 
   
     
    price: {
        type: String,
        required: false,
      },
      ofprice: {
        type: String,
        required: false,
      },
      categori: {
        type: String,
        required: false,
      },
      dastbandi:{
        type: String,
        required: false,
      },
      numberof: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },

      rate:{
        type: String,
        required: false,
      },
     

      weight:{
        type: String,
        required: false,
      },
      productDetil:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productDetil"
 
        }
       ],
 
     

   
     

  },
  { timestamps: true }
);


const schemaproductBeFordetil = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    href:{
      type: String,
      required: false,
    },


    coverasli: {
        type: String,
        required: false,
      },
 
   
     
    price: {
        type: String,
        required: false,
      },
      ofprice: {
        type: String,
        required: false,
      },
      categori: {
        type: String,
        required: false,
      },
      dastbandi:{
        type: String,
        required: false,
      },
      numberof: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },

      rate:{
        type: String,
        required: false,
      },
     

      weight:{
        type: String,
        required: false,
      },
      productDetil:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "productDetil"
 
        }
       ],
 
     

   
     

  },
  { timestamps: true }
);









const schemaproductDetil = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    href:{
      type: String,
      required: false,
    },
    adress: {
        type: String,
        required: false,
      },
      phonenumber: {
        type: String,
        required: false,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
     },
     coverasli: {
      type: String,
      required: false,
    },
    
     additionalImages: [{
      type: String 
  }],
    video: {
      type: String,
 required: false,
   },
     
    price: {
        type: String,
        required: false,
      },
      ofprice: {
        type: String,
        required: false,
      },
      categori: {
        type: String,
        required: false,
      },
      dastbandi:{
        type: String,
        required: false,
      },
      numberof: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },
      created: {
        type: String,
        required: false,
      },
      dec: {
        type: String,
        required: false,
      },
      rate:{
        type: String,
        required: false,
      },
     
      comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Commentroduct"
     }],
      weight:{
        type: String,
        required: false,
      },
      citycreate:{
        type: String,
        required: false,
      },
     

      numberofbehdasht:{
        type: String,
        required: false,
      }
   
     

  },
  { timestamps: true }
);


const CommentSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
 },
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users"
},
 UserName:{ type:String,
  required: false},
 liked: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "users"
}],
disliked: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "users"
}],
commpleted:{
  type:Boolean,
  default:false
},
score:{
   type:String,
   default:false

},
 
   parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commentroduct'
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Commentroduct'
  }],

  like:{
    type: Number,
    ref: 'Commentroduct',
    default:1
  },
  dislike:{
    type: Number,
    ref: 'Commentroduct',
    default:1
  },
   date:{
      type:String,
      required: true,
 
      // default:moment(new Date()).locale("fa").format("YYYY/MM/DD HH:mm:ss"),
      default:sub(new Date(), { seconds: 0 }).toISOString()
     
 
    },
   text: String
})













const Product = mongoose.model("Product", schemaproduct);
const productBeFordetil = mongoose.model("productBeFordetil", schemaproductBeFordetil);

const ProductDetil = mongoose.model("productDetil", schemaproductDetil);
const Comment = mongoose.model("Commentroduct", CommentSchema);

module.exports = {Product,ProductDetil,Comment,productBeFordetil};
