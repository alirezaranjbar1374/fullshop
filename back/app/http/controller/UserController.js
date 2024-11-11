const _ = require('lodash');
const bcrypt = require('bcrypt');
const UserModel= require("../../models/User")
const UserModelproduct= require("../../models/Userproduct")
const {Otpmodel}=require("../../models/Otp")
const NodeCache = require( "node-cache" );
const jwt = require('jsonwebtoken');

var myCache = new NodeCache( { stdTTL: 2*60*60, checkperiod: 5*6} );
var Kavenegar = require('kavenegar');
  var api = Kavenegar.KavenegarApi({
      apikey: '58364C41626852342B3774336E4846544E51524276753078516A776D614C4C336B6B67536E3344774571733D'
  });
  const request = require('request');
  
const Payment= require("../../models/payment")
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('0000000-0000-0000-0000-0000000000000',true);

let one=[]
let two=[]
let userbasket={}
let arrbasket=[]
  var codeersali=''


const {
validateCreateUser,
validateLoginUser
} = require('../validator/UserValidator');
const { rest } = require('lodash');
const { Iitembasket,Basketfull, Userschema } = require('../../models/UserProductnew');
class CoursesController {



 

  async login(req,res){
    const { error } = validateLoginUser(req.body);
    if (error) return res.status(400).send({ message: error.message });

    let user = await UserModel.findOne({ email: req.body.email });

  //اگه کاربر مودی فای یعنی تغییر داده تشده بوود پسوردش بیا
      // if (!user.isModified("password")) {
      //   res.send("sasy")

      // }
  
     

    if (!user)
      return res
        .status(400)
        .send({ message: 'کاربری با این ایمیل یا پسورد یافت نشد' });

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result)
      return res
        .status(400)
        .send({ message: 'کاربری با این ایمیل یا پسورد یافت نشد' });

    const token = user.generateAuthToken();
    res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send({ success: true });

  }
  async userdetil (req,res){
    const id = req.params.id;
    let user = await UserModel.findById(id).select("basket.course");
    if (!user)
      return res
        .status(400)
        .send({ message: 'کاربری با این مشخصه وجود دارد' });
  
       
      res.send(user);
  
  
  
  
  
  }

  async login2(req,res){
    //   const id=req.user.email
    //  const user= await UserModel.findById(id)
    //  console.log("email",user);
    //  if (!user)
    //  return res.status(404).send({ message: "کاربری بااین مشحصات یافت نشد" });
  
  
  const number =Math.floor(Math.random()*90000+10000);
  // myCache.set(req.user._id,number)
  // console.log("mucache",myCache.get(req.user._id));
  // codeersali=myCache.set(req.user._id,number)
  
  
   api.Send(
      {
     message: `میتوانید از کد ${number}برای ورود به سایت علی رنجبر استفاده کنید`,
     sender: "10008663",
     receptor: '09399123908'
   },
   function (response,status){
      console.log(response);
      console.log(status);
      res.status(status).send(response)
  
  
   }
   )
   
     
   
     }



  async loginbeforeVerfy(req,res){
    // const { error } = validateLoginUser(req.body);
    // if (error) return res.status(400).send({ message: error.message });

    let user = await UserModel.findOne({ email: req.body.email });
    console.log("user",user);
    if (!user){
      return res
      .status(400)
      .send({ message: 'کاربری با این ایمیل یا پسورد یافت نشد' });

    }else{


// console.log('TOLKEN',token);

const number =Math.floor(Math.random()*90000+10000);
myCache.set("req.body.email",number)
myCache.set("req.body.email1",req.body.email)


// codeersali=myCache.set(user,number)


 api.Send(
    {
   message: `میتوانید از کد ${number}برای ورود به سایت علی رنجبر استفاده کنید`,
   sender: "10008663",
   receptor: '09399123908'
 },
 function (response,status){
    console.log(response);
    console.log(status);
    res.status(status).send(response)
    // const token = user.generateAuthToken();
    // res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(status).send(response);
   


 }
           
 )




// const result = await bcrypt.compare(req.body.password, user.password);
// if (!result)
//   return res
//     .status(400)
//     .send({ message: 'کاربری با این ایمیل یا پسورد یافت نشد' });
      
    }




  

  }

 








  async registerproduct(req,res){
    // const { error } = validateCreateUserProduct(req.body);
    // if (error) return res.status(400).send({ message: error.message });
    console.log("req.body",req.body);
  const {name,phone,email,password}=req.body
    let user = await Userschema.findOne({
  $or:[{email},{phone}]
    });
   
    console.log("user",user);
    // const countOfRegisteredUser = await UserModelproduct.count();
  const date=new Date()
  const expTime=date.getTime() + 300000
  const numbercode =Math.floor(Math.random()*90000+10000);
  const times=10
  if (user){
    return res
    .status(400)
    .send("شماره تلفن یا ایمیل نکراری است");
  }else if(!name  || !phone || !password){
    res.status(401)
    .send("واردکردن تمام موارد اجباری است")
  }
  else{
  
  






    
  
  
  
    request.post({
      url: 'http://ippanel.com/api/select',
      body: {
  "op":"pattern",
  "user":"u09399123908",
  "pass":"Faraz@1801090018428721",
  "fromNum":"3000505",
  "toNum":phone,
  "patternCode":"0xvp2yxj6e9kesk",
  "inputData":[
  {"verification-code":numbercode}
  // {"brand":"bmw"}
  ]
  },
      json: true,
  },
  async function (error, response, body) {
      if (!error && response.statusCode === 200) {
  //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
  await Otpmodel.create({phone,code:numbercode,expTime,times})
  return res.status(201).send("باموفقیت پیام ارسال  شد" );
      } else {
  console.log("whatever you want");
  
      return res.status(501).send("PROBELM TO SEND CODE SERVER")
      }
  
    });
  
  }
  
  }
  






  async verfiayfaraz(req,res){
    const {name,phone,email,password,code}=req.body
    const otp=await Otpmodel.findOne({phone,code})
    if(otp){
  const date=new Date()
  const now=date.getTime()
  if(otp.expTime> now){
    const userfind=await Userschema.findOne({phone})
    if(userfind){
      return res.status(403).send("همچین کاربری داریم ")
    }
     let user = new Userschema(_.pick(req.body,["name","email","password","phone"]))
  
    const salt =await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    user = await user.save();
  
    const token = user.generateAuthToken();
    return res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(201).send({ success: true })
     
  }else{
    return res.status(410).send("code is exptime")
  
  }
  
    }else{
      return res.status(409).send("کد ارسالی نداریم")
    }
  }
  
  
  
  async loginproduct(req,res){
    // const { error } = validateLoginUser(req.body);
    // if (error) return res.status(400).send({ message: error.message });

    let user = await Userschema.findOne({ phone: req.body.phone });

  //اگه کاربر مودی فای یعنی تغییر داده تشده بوود پسوردش بیا
      // if (!user.isModified("password")) {
      //   res.send("sasy")

      // }
  
      if( !req.body.phone || !req.body.password){
        res.status(401)
        .send("واردکردن تمام موارد اجباری است")
      }

    if (!user)
      return res
        .status(400)
        .send({ message: 'کاربری با این شماره یا پسورد یافت نشد' });

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result)
      return res
        .status(400)
        .send({ message: 'کاربری با این شماره یا پسورد یافت نشد' });
        res.cookie('userId', '12345', { httpOnly: false, secure: false }); // کوکی با نام userId
        res.cookie('userId1', '12345', { httpOnly: false, secure: true }); // کوکی با نام userId
0
    const token = user.generateAuthToken();
    const tokencooki = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
    res.cookie('token', tokencooki, {
      httpOnly: false, // فقط از طریق HTTP قابل دسترسی است و از جاوااسکریپت قابل دسترسی نیست
      secure: process.env.NODE_ENV === 'production', // فقط در محیط تولید از HTTPS استفاده شود
      maxAge: 3600000 // مدت زمان انقضای کوکی به میلی‌ثانیه (1 ساعت)
    });
  
    res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send({ success: true });

  }









  async login1(req,res){
    const id=req.user._id
   const user= await UserModel.findById(id)
   console.log("email",user);
   if (!user)
   return res.status(404).send({ message: "کاربری بااین مشحصات یافت نشد" });
const number =Math.floor(Math.random()*90000+10000);
console.log("req.user._id",req.user._id);
myCache.set(req.user._id,number)
console.log("mucache",myCache.get(req.user._id));
codeersali=myCache.set(req.user._id,number)


 api.Send(
    {
   message: `میتوانید از کد ${number}برای ورود به سایت علی رنجبر استفاده کنید`,
   sender: "10008663",
   receptor: '09399123908'
 },
 function (response,status){
    console.log(response);
    console.log(status);
    res.status(status).send(response)


 }
 )
 
   
 
   }



   async verifayUser(req,res){
    //  console.log("skm",myCache.get(req.user.email));
    console.log("mucache",myCache.get("req.body.email1"));

    if(!req.body.code)
    return res.status(400).send("باید یک کدیفرسنید")
 var code =req.body.code;
 const lastcode =myCache.get("req.body.email");
 console.log(code,lastcode);
 if(code==lastcode){
    // const user =await UserModel.findById(req.user._id);
    // // user.active=true;
    // await user.save();
    
    let user = await UserModel.findOne({ email: myCache.get("req.body.email1") });
    // console.log("userser",user)
    const token = user.generateAuthToken();

    res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send({ success: true })
 }
 
 else res.status(400).send(false)
 
 
 }




















  async register(req,res){
    const { error } = validateCreateUser(req.body);
    if (error) return res.status(400).send({ message: error.message });

    let user = await UserModel.findOne({ email: req.body.email });
    if (user)
      return res
        .status(400)
        .send({ message: 'کاربری با این ایمیل وجود دارد' });
    user = new UserModel(_.pick(req.body,["name","email","password"]))

    const salt =await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    const secret_Key=process.env.CAPTCHEA_SCRET
    console.log("req.body[",req.body["g-recaptcha-response"]);
    // if(!req.body["g-recaptcha-response"]){
    //   res.status("401").send("اعتبارسنجی کپجا الزامی میباشد")
    // }
    user = await user.save();

    const token = user.generateAuthToken();
    res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send(user );
    
  }

async updateBasket(req,res){
  const basketbody=(_.pick(req.body,["teacherId","teacherName","course"]))
  // console.log("basket",basketbody);
   arrbasket=basketbody.course
  // console.log("arrbasket",arrbasket);
  if(!basketbody.course)
  return res
  .status(400)
  .send({ message: 'خداقل یک دوره باید درسبد خرید باشد' });

  const user= await UserModel.findById(req.user._id );
    console.log("user",user);
  if(!user)
  return res
  .status(401)
  .send({ message: 'شما کاربر لاگین شده نیستید' });

  const basket=user.basket==undefined?user:user.basket;

  if(basket?.course==undefined){

    user.basket=basketbody
    one=basketbody.course
    
    



  }else{
    user.basket.course=[...basket.course,arrbasket].flat()

    two=arrbasket

  }
  
console.log("babauser",user);
  // await user.save()
  userbasket=user.basket
  res.send(basketbody)
  console.log("userbasket111",userbasket);

}
async getbasket(req,res){
  const user= await UserModel.findById(req.user._id );
  res.send(user.basket)


}


async checkoutbasket(req,res){
  const user= await UserModel.findById(req.user._id );

  const basket=user.basket;


  const amount=arrbasket.reduce((acc,item)=>{
    return acc +(item.price *1)
  },0)
  const payment=new Payment({
    user:{
      _id:user._id,
      email:user.email
    },
    basket,
    amount,

    
  })


 const response=await zarinpal.PaymentRequest({
    Amount: amount,
    CallbackURL: 'http://localhost:3001/api/user/veriyfaypayment',
    Description: 'پزداخت به علی',
    Email: user.email,
    Mobile: '09120000000'
  })
  payment.paymentCode=response.authority
  console.log("payment",payment?.basket);

  console.log("arrbasket12",arrbasket);
  payment.basket=userbasket
  await payment.save()

  // console.log("res_zaripal",response);
  // user.basket=undefined
console.log('USERZARIN',user);
  await user.save()
  res.send({url:response.url})


}
async veriyfaypayment(req,res){
  const paymentCode=req.query.Authority
    console.log("jhghgh",paymentCode);


  const status=req.query.Status;
  const payment=await Payment.findOne({paymentCode})
  if(status=="OK"){

  const response=await zarinpal.PaymentVerification({
  
      Amount:payment.amount, // In Tomans
      Authority: paymentCode,
    })

      if (response.status === -21) {
        res.send('پرداخت پیدا نشد');
      } else {
        payment.refId=response.RefID
        payment.success=true
        const user= await UserModel.findById(payment.user._id );
        console.log("slmali",payment);
        console.log("userbozorg",user);
        user["basket"]=userbasket
        await user.save()

        await payment.save()
    res.send(`<h1>شماره پیگیری خرید: ${response.RefID}</h1>
    
    <a href="http://localhost:3000/Sucpay/paymentCode=${paymentCode}">رفتن به صفحه اصلی</a>
    
    `);
      }


  }else return res.send("پرداخت ناموفق")
  // res.send("slm verifaypayment")
}

async getPaymentDetil(req,res){

  const paymentCode=req.params.paymentCode;
  const payment=await Payment.findOne({paymentCode})
  if(payment){
    res.send(payment)
  }else rss.status(404).send("یافت نش")
}





  
}

module.exports = new CoursesController();
