
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Otpschema = new Schema({
    phone: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    expTime:{
        type:Number,
        required:true
    },
    times:{
        type:Number,
        required:true,
        default:0
    }
  },
  { timestamps: true }
);
const Otpmodel = mongoose.model('Otpmodel', Otpschema);

// const model = mongoose.model.Otpmodel || mongoose.model("Otpmodel", schema);

// module.exports = model;
module.exports = {Otpmodel}