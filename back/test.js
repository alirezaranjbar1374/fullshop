
const _ = require('lodash');
const bcrypt = require('bcrypt');
const UserModel= require("../../models/User")
const UserModelproduct= require("../../models/Userproduct")

const BehsazanModel=require("../../models/Behsazan")
const BehsazanModleone=require("../../models/Testbeh")
const {Otpmodel}=require("../../models/Otp")
const uuidv4 = require('uuid/v4')
const NodeCache = require( "node-cache" );
const request = require('request');

var myCache = new NodeCache( { stdTTL: 2*60*60, checkperiod: 5*6} );
var Kavenegar = require('kavenegar');
  var api = Kavenegar.KavenegarApi({
      apikey: '58364C41626852342B3774336E4846544E51524276753078516A776D614C4C336B6B67536E3344774571733D'
  });
const Payment= require("../../models/payment")
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('0000000-0000-0000-0000-0000000000000',true);

let one=[]
let two=[]
let as=[]
let dataone=[]
let CAPTCHA_NUM;
let arrbasket=[]
  var codeersali=''

 
const {
validateCreateUser,
validateLoginUser,
validateLoginUserProduct,
validateCreateUserProduct
} = require('../validator/UserValidator');
const { rest, uniqueId } = require('lodash');
const captchapng = require('captchapng');
const { Author, Blog,Comment, ReplayComments,Comment1, Commentnew, Commentneheelw } = require('../../models/Articeles');
const { validatesendUser } = require('../validator/BehsazanValidator');
const { string } = require('joi');
const { db } = require('../../models/User');
const { CommentCourse } = require('../../models/Commet');
const { Messagesait } = require('../../models/Messagesait');
let a1=1
class CoursesController {


async behsazan (req,res){
  const { error } = validatesendUser(req.body);
  if (error) return res.status(400).send({ message: error.message });

  let userbid1 = await BehsazanModel.find();
  console.log(userbid1);
  let b=userbid1.length;
  console.log(b);

  console.log("userbid1",userbid1[b-1]?.bid==undefined?0:userbid1[b-1]?.bid);


  let userbid = await BehsazanModel.findOne({ bid: req.body.bid });
  // const countOfRegisteredUser = await UserModel.count();

  // role: countOfRegisteredUser > 0 ? "USER" : "ADMIN",

  if (userbid)
    return res
      .status(400)
      .send({ message: "bid قبلا ثبت شده" });
      let arrbehsazan=_.pick(req.body,["bid","bc","f1","f2","f3"])
      let arrbehsazan2=arrbehsazan.bid=userbid1[b-1]?.bid==undefined?0:Number(userbid1[b-1]?.bid)+1

      console.log("arrbehsazan1",arrbehsazan);
      console.log("arrbehsazan2",arrbehsazan2);
      console.log("arrbehsazan3",arrbehsazan);


      // console.log("a1",a1++);
  var user = new BehsazanModel(arrbehsazan)

  // const salt =await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password,salt);

  user = await user.save();
  let response={
    "rfn":uuidv4(),
    "dtl":{
      "bid":req.body.bid,
      "f1":req.body.f1,
      "f2":req.body.f2
    }

 
  }




  const id = req.params.id;
  const data = await AllThechermodel.findById(id);
  if(!data) return res.status(400).send("مدرس مورد نظر یافت نشد");

  const body = {
    bid : req.body.bid,
    bc : req.body.bc,
    f1 : req.body.f1,
    f2 : req.body.f2,
    f3 : req.body.f3

  }
  data.comment.push(body)
  await data.save();
  res.send(true);


  const token = user.generateAuthToken();
  res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send(response );



}




async behsazanDatavord (req,res){
let users=[];
let user=BehsazanModleone.find()
 users = req.body;



let resdata=users.map(item=>(
{
      "bid":item.bid,
      "f1":item.f1,
      "f2":item.f3
}))

let response={
  "rfn":uuidv4(),
  "dtl":resdata


}

BehsazanModleone.insertMany(users)
  .then(() => res.send(response))
  .catch(err => console.log("ali",err));

console.log("resdata",response);

  // const token = user.generateAuthToken();
  // res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send(response );

 




}




























 

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
    res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send({ "x-auth-token": token });

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




 async registerrest(req,res){
  let user = await UserModel.findOne({email:req.body.email});
  console.log("userrest",user);


  const salt =await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password,salt);

  user = await user.save();

  res.send("پسورد تغییر یافت")
}














async registerproduct(req,res){
  // const { error } = validateCreateUserProduct(req.body);
  // if (error) return res.status(400).send({ message: error.message });
  console.log("req.body",req.body);
const {name,phone,email,password}=req.body
  let user = await UserModelproduct.findOne({
$or:[{email},{phone}]
  });
  console.log("user",user);
  const countOfRegisteredUser = await UserModelproduct.count();
const date=new Date()
const expTime=date.getTime() + 300000
const numbercode =Math.floor(Math.random()*90000+10000);

if (user){
  return res
  .status(400)
  .send(user);
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
"fromNum":"300500",
"toNum":{phone},
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
await Otpmodel.create({phone,numbercode,expTime,times})
return res.status(201).send("باموفقیت پیام ارسال  شد" );

        // console.log(response.body);
    } else {
console.log("whatever you want");

    return res.status(501).send("PROBELM TO SEND CODE SERVER")
    }

  });



}

}


async verfiayfaraz(req,res){
  const {name,phone,email,password,numbercode}=req.body
  const otp=await Otpmodel.findOne({phone,numbercode})
  if(otp){
const date=new Date()
const now=date.getTime()
if(otp.expTime> now){
  user = new UserModelproduct(_.pick(req.body,["name","email","password","phone"]))

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
  const { error } = validateLoginUserProduct(req.body);
  if (error) return res.status(400).send({ message: error.message });
console.log("req.body",req.body);
  let user = await UserModelproduct.findOne({ phone: req.body.phone });

console.log("user",user);
  if (!user)
    return res
      .status(403)
      .send({ message: 'کاربری با این شماره یا پسورد یافت نشد' });

  const result = await bcrypt.compare(req.body.password, user.password);
  console.log("result",user.password);
  if (!result)
    return res
      .status(403)
      .send({ message: 'کاربری با این شماره یا پسورد یافت نشد' });

  const token = user.generateAuthToken();
 return res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send({ "x-auth-token": token });
 
}




async sendCodeforgetpass(req,res){
let phone=req.body.phone
  let user = await UserModelproduct.findOne({ phone: phone });
  const numbercode =Math.floor(Math.random()*90000+10000);


console.log("user",user);
  if (!user)
    return res
      .status(403)
      .send({ message: 'کاربری با این شماره یا پسورد یافت نشد' });

  const result = await bcrypt.compare(req.body.password, user.password);
  console.log("result",result);
  if (!result)
    return res
      .status(403)
      .send({ message: 'کاربری با این شماره یا پسورد یافت نشد' });



      request.post({
        url: 'http://ippanel.com/api/select',
        body: {
    "op":"pattern",
    "user":"u09399123908",
    "pass":"Faraz@1801090018428721",
    "fromNum":"300500",
    "toNum":{phone},
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
          myCache.set("numbercode",numbercode)

    //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(phone, salt);
    // user = await user.save();
    // await Otpmodel.create({phone,numbercode,expTime,times})
    return res.status(201).send("باموفقیت پیام ارسال  شد" );
   
            // console.log(response.body);
        } else {
    console.log("whatever you want");
   
        return res.status(501).send("PROBELM TO SEND CODE SERVER")
        }
   
      });





}



async verfaycodeforget(req,res){

  if(!req.body.code)
    return res.status(400).send("باید یک کدیفرسنید")
 var code =req.body.code;
 const lastcode =myCache.get("numbercode");
 console.log(code,lastcode);
 if(code==lastcode){
  let user = await UserModelproduct.findOne({ phone: req.body.phone });

 const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(code, salt);
    user = await user.save();
    return res.status(200).send("رمز عبور با موفقیت تغییر کرد")
 }

}







async testbarbar(req,res){
  const data=Otpmodel.find()
  res.send(data)
}






  async register (req,res){
    const { error } = validateCreateUser(req.body);
    if (error) return res.status(400).send({ message: error.message });

    let user = await UserModel.findOne({ email: req.body.email });
    const countOfRegisteredUser = await UserModel.count();

    // role: countOfRegisteredUser > 0 ? "USER" : "ADMIN",

    if (user)
      return res
        .status(400)
        .send({ message: 'کاربری با این ایمیل وجود دارد' });
    user = new UserModel(_.pick(req.body,["name","email","password"]))

    const salt =await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    // const secret_Key=process.env.CAPTCHEA_SCRET
    // console.log("req.body[",req.body["g-recaptcha-response"]);
    // if(!req.body["g-recaptcha-response"]){
    //   res.status("401").send("اعتبارسنجی کپجا الزامی میباشد")
    // }
    user = await user.save();

    const token = user.generateAuthToken();
    res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send(user );
   
  }

async updateBasket(req,res){
  const basketbody=(_.pick(req.body,["teacherId","teacherName","course"]))
  console.log("basket",basketbody);
   arrbasket=basketbody.course
  console.log("arrbasket",arrbasket);
  if(!basketbody.course)
  return res
  .status(400)
  .send({ message: 'خداقل یک دوره باید درسبد خرید باشد' });
  // if(!basketbody.teacherId || !basketbody.teacherName )
  // return res
  // .status(400)
  // .send({ message: 'اسم و ایدی مدرس باید باشه' });
  const user= await UserModel.findById(req.user._id );
    console.log("user",user);
  if(!user)
  return res
  .status(401)
  .send({ message: 'شما کاربر لاگین شده نیستید' });
  // as.append(basketbody)
  // console.log("as",as);
  // console.log("user.basket",user.basket);
  const basket=user.basket==undefined?user:user.basket;
  // console.log("BASKET",basket);
  // console.log("sanavie",basket,arrbasket);
  if(basket?.course==undefined){
    // user["basket"]=arrbasket
    console.log("22",user);
    user.basket=basketbody
    one=basketbody.course
   
   



  }else{
    user.basket.course=[...basket.course,arrbasket].flat()

    two=arrbasket

  }
 

  await user.save()
  res.send(basketbody)
}

async getbasket(req,res){
  const user= await UserModel.findById(req.user._id );
  res.send(user.basket)


}


async checkoutbasket(req,res){
  const user= await UserModel.findById(req.user._id );

  const basket=user.basket;
  console.log("0ne",one.course);
  console.log("twe",two);
  console.log("rrer",one.course==undefined>0? one.course:two);

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
 
  await payment.save()
  // console.log("payment",payment);

  // console.log("res_zaripal",response);
  // user.basket=undefined

  await user.save()
  res.send({url:response.url})


}
async veriyfaypayment(req,res){
  const paymentCode=req.query.Authority
    console.log("jhghgh",paymentCode);


  const status=req.query.Status;
  const payment=await Payment.findOne({paymentCode})
  console.log("slmali",payment.amount);
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
async recptchpng(req,res){
 CAPTCHA_NUM=parseInt(Math.random() * 9000 + 1000)
    const p=new captchapng(80,30,CAPTCHA_NUM);
    p.color(80,0,80,10)
    p.color(0, 204, 255)
    const img=p.getBase64()
    const imgBase64=Buffer.from(img,'base64')
    const captcha={
      img,
      CAPTCHA_NUM
    }
    res.send(captcha)
}



async CreatMeesageSait(req,res){
  console.log("req.body",req.body);
  // let countQusation=await Messagesaitaval.find({email1:req.body.email1}).count()
  // console.log("countmessage",countQusation);
  let Meesage = new Messagesait(_.pick(req.body,["new_email","name","phoneNumber","textBody","categori"]))
  Meesage= await Meesage.save();

  res.send(Meesage)
}


async registerArticel(req,res){


  let user = new Author(_.pick(req.body,["name","email"]))
console.log("user",user);
 
  user = await user.save();

  const token = user.generateAuthToken();
  res.header("Access-Control-Expose-headers","x-auth-token").header('x-auth-token', token).status(200).send(user );  
}

async CreateArticel(req,res){
 
  const id = req.params.id;
  console.log("req========",req);
  console.log("id:",id);

  const url = req.protocol + '://' + req.get('host')
    // teacher.course.push({..._.pick(req.body,["title","description","body","cover","shortName","categoryID"]),cover :  url + '/public/' + req.file.filename});
    // await teacher.save();

  let newBlog = new Blog({user:id,..._.pick(req.body,["title","description","body","cover","shortName"]),cover :  url + '/public/' + req.file.filename})

   





 await newBlog.save().then(result => {
    Blog
       .populate(newBlog, { path: "Author" })
       .then(blogs => {
 
          res.json({
             message: "blog added",
             blogs
          });
 
       })
 })
 
// return res.status(201).json(populatedCourse);
 
}
async CreateArticelComment1(req,res){
 
  const id = req.params.id;
  let newComment = new Comment({
    blog:id,
title:req.body.title,
    body: req.body.body
   
 });

 newComment.save().then(result => {
  Comment
       .populate(newComment, { path: "Blog" })
       .then(comment => {
 
          res.json({
             message: "Comment added",
             comment
          });
 
       })
 })
//  console.log("ali", db.collections.comments.deleteMany({}));

}


async CreateArticelComment(req,res,next){
 
  // const id = req.params.id;


  try {



     // if (parent) {
    //   const parentComment = await Comment.findById(parent);
   
    const { text, parent,blog,like,dislike,user,liked,UserName } = req.body;
    const userdetil= await UserModel.findById(user);
    console.log("userdetil",userdetil);
  if(!userdetil)
  return res
  .status(401)
  .send({ message: 'شما کاربر لاگین شده نیستید' });
    let comment;
   
    if (parent) {
      const parentComment = await Comment.findById(parent);
     
     
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
      const findliked= parentComment?.liked?.find(item=>item==user)
      const finddisliked= parentComment?.disliked?.find(item=>item==user)


      if(like || dislike ){
        let actionComment=like?like:dislike
        let actioncomments=like?"like":"dislike"
        parentComment[actioncomments]=actionComment
        // console.log("parentComment",parentComment);

        // console.log("findliked",findliked);
        if(like){
          if( findliked){
            const fondIndex=parentComment?.liked?.findIndex(item=>item==user)
           
            parentComment?.liked?.splice(fondIndex,1)
            // parentComment?.liked.filter(item=>!item==user);
              console.log("after",parentComment?.liked);
           
              await parentComment.save();
           
           
            }
            else{
              parentComment?.liked?.push(user)
              await parentComment.save();
              console.log("bbb");
           
        }

}

if(dislike){
  if( finddisliked){
    const fondIndex=parentComment?.disliked?.findIndex(item=>item==user)
   
    parentComment?.disliked?.splice(fondIndex,1)
    // parentComment?.liked.filter(item=>!item==user);
      console.log("after",parentComment?.disliked);
   
      await parentComment.save();
   
   
    }
    else{
      parentComment?.disliked?.push(user)
      await parentComment.save();
      console.log("bbb");
   
    }
}

   

   


    }else{
      comment = new Comment({ text, parent: parentComment._id,blog:blog,user,UserName:userdetil.name });
      parentComment.children.push(comment._id);
      console.log("ccccccc");

      await parentComment.save();
          await comment !=undefined && comment.save();

    }
     
    } else {
      comment = new Comment({  blog:req.params.id,
        parent:req.body.parent,
            text: req.body.text,
            user:req.body.user,
            UserName:userdetil.name
         
          });
      await comment.save();

    }
    // await comment !=undefined && comment.save();
//  console.log("ali", db.collections.comments.deleteMany({}));

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }



}


async listCompletedTue(req,res){
  const id = req.params.id;


const findComment = await Comment.findById(id);


console.log("findComment",findComment);
findComment.commpleted=true
   await findComment.save();
   res.send(true)
}



async ListComment(req,res){
  const list =await Comment.find().populate("Blog") // key to populate
  .then(blog => {
    console.log("blog",blog);
     res.json(blog);
  });

}





async CreateReplayComment(req,res){
 
  const id = req.params.id;
  let newAnswerComment = new ReplayComments({
    comment:id,
title:req.body.title,
    body: req.body.body
   
 });


 newAnswerComment.save().then(result => {
  ReplayComments
       .populate(newAnswerComment, { path: "Comment" })
       .then(Answercomment => {
 
          res.json({
             message: "AnswerComment added",
             Answercomment
          });
 
       })
 })
//  console.log("ali", db.collections.comments.deleteMany({}));

}
async getoneAnswerComments(req,res){
  const id = req.params.id;
  if(id==undefined){
    const list =await ReplayComments.find()
    const   FilterCommentTre=list?.filter(item=>item.commpleted==true)
    console.log("[=================]",FilterCommentTre);
    res.send(FilterCommentTre)
  }else{
  const list =await ReplayComments.find().revres()
  const   FilterCommentTre=list?.filter(item=>item.commpleted==true)

res.send(FilterCommentTre)

  }


}


async articelsuserone(req,res){
  const id = req.params.id;
  Blog
   .find({user: id })
   .populate("blogs","User") // key to populate
   .then(blog => {
      res.json(blog);
   });
}
async allarticels(req,res){
  const list = await Blog.find()
  .select("title description body cover shortName")
  .limit(20);
  console.log("logggggg",list);
res.send(list.reverse());

}

async allarticelsUser(req,res){
  const list = await Author.find().select("name email")
  res.send(list.reverse());

}

async createComment (req, res, next) {
  try {
    const { text, parent } = req.body;

    let comment;
    if (parent) {
      const parentComment = await Comment1.findById(parent);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
      comment = new Comment1({ text, parent: parentComment._id });
      parentComment.children.push(comment._id);
      await parentComment.save();
    } else {
      comment = new Comment1({ text });
    }
    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};
// find({ _id: { $in: ["5b66577c2f05bf1eb07956e0" ,"5b66b1879526eb0444d047cb"] }})
//     .then(users =>{
//         console.log("user", users)
//     })


async getoneComments(req,res){
  const id = req.params.id;
  if(id==undefined ){
    const list =await Comment.find()
    const   FilterCommentTre=list?.filter(item=>item.commpleted==true)
    console.log("[=================]",list);
    res.send(FilterCommentTre)
  }else{
    let com=[]
  const list =await Comment.find()
  const   FilterCommentTre=list?.filter(item=>item.commpleted==true)

  console.log("[=================]",list);
res.send(FilterCommentTre)

  }


}


async Allcommets(req,res){
  const id = req.params.id;
  if(id==undefined ){
    const list =await Comment.find()
   
    console.log("[=================]",list);
    res.send(list)
  }else{
    let com=[]
  const list =await Comment.find()

  console.log("[=================]",list);
res.send(list)

  }


}

async DeletComment(req,res){


  const id=req.params.id;
  const result=await Comment.findByIdAndRemove(id)
  res.status(200).send("delet");
}



async getCommentsForPost (req, res, next) {
  try {
    const { postId } = req.params;

    let  myNestedArray = await Comment1.find()
     let myNestedArray2  = await myNestedArray
   
    function mapReplies(comment)  {
      return {
        id: comment._id,
        text: comment.text,
        children: comment.children.map(replyId => {
          const reply = myNestedArray2.find(c => c._id === replyId);
          return reply ? mapReplies(reply) : null;
        }).filter(Boolean)
      }
    }
   
    const myMappedArray = myNestedArray2.filter(c => !c.parent).map(mapReplies);
   
    console.log("myMappedArray", myMappedArray);
   

    res.json(myNestedArray2);
  } catch (err) {
    next(err)
  }
}


async CreateCommentNew(req, res) {
  const { author, text, parentComment } = req.body;

  const comment = new Commentnew({
    author,
    text,
    parentComment,
  });

  await comment.save();

  // Find parent comment and add new comment as a reply
  if (parentComment) {
    const parent = await Commentnew.findById(parentComment);
    parent.replies.push(comment);
    await parent.save();
  }

  res.send(comment);

}


 async GetCommentNew (req, res)  {
  const comments = await Commentnew.find({ parentComment: null }).populate('replies');
  res.send(comments);
}

 async GetCommentNewId (req, res)  {
  const { id } = req.params;
  const comments = await Commentnew.find({ parentComment: id }).populate('replies').populate('parentComment');
  res.send(comments);
};






async CreatHello (req, res) {
  const { content, author, parentCommentId } = req.body;

  const newComment = new Commentneheelw({
    content,
    author,
    parentCommentId,
  });

  await newComment.save();

  res.send(newComment);
}



async  getChildComments(req,res) {
  const  commentId  = req.params.commentId;

  async function getChildComments1(commentId) {
  const comments = await Commentneheelw.find({ parentCommentId: commentId });
  console.log("comments",comments);
  const childComments = [];

  for (const comment of comments) {
    const commentWithChildren = {
      ...comment.toObject(),
      childComments: await getChildComments1(comment._id),
    };

    childComments.push(commentWithChildren);
  }
console.log("childComments",childComments);
  return childComments;
}
getChildComments1(commentId)

res.send("xa")

console.log("childCommentschildComments",childComments);

}
 



async CreateArticelComment1(req,res){
 
  const id = req.params.id;
  let newComment = new Comment({
    blog:id,
title:req.body.title,
    body: req.body.body
   
 });

 newComment.save().then(result => {
  Comment
       .populate(newComment, { path: "Blog" })
       .then(comment => {
 
          res.json({
             message: "Comment added",
             comment
          });
 
       })
 })
//  console.log("ali", db.collections.comments.deleteMany({}));

}


async CreateCourseComment(req,res,next){
 
  // const id = req.params.id;


  try {



     // if (parent) {
    //   const parentComment = await Comment.findById(parent);
   
    const { text, parent,course,like,dislike,user,liked,UserName } = req.body;
    const userdetil= await UserModel.findById(user);
    console.log("userdetil",userdetil);
  if(!userdetil)
  return res
  .status(401)
  .send({ message: 'شما کاربر لاگین شده نیستید' });
    let comment;
   
    if (parent) {
      const parentComment = await CommentCourse.findById(parent);
     
     
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }
      const findliked= parentComment?.liked?.find(item=>item==user)
      const finddisliked= parentComment?.disliked?.find(item=>item==user)


      if(like || dislike ){
        let actionComment=like?like:dislike
        let actioncomments=like?"like":"dislike"
        parentComment[actioncomments]=actionComment
        // console.log("parentComment",parentComment);

        // console.log("findliked",findliked);
        if(like){
          if( findliked){
            const fondIndex=parentComment?.liked?.findIndex(item=>item==user)
           
            parentComment?.liked?.splice(fondIndex,1)
            // parentComment?.liked.filter(item=>!item==user);
              console.log("after",parentComment?.liked);
           
              await parentComment.save();
           
           
            }
            else{
              parentComment?.liked?.push(user)
              await parentComment.save();
              console.log("bbb");
           
        }

}

if(dislike){
  if( finddisliked){
    const fondIndex=parentComment?.disliked?.findIndex(item=>item==user)
   
    parentComment?.disliked?.splice(fondIndex,1)
    // parentComment?.liked.filter(item=>!item==user);
      console.log("after",parentComment?.disliked);
   
      await parentComment.save();
   
   
    }
    else{
      parentComment?.disliked?.push(user)
      await parentComment.save();
      console.log("bbb");
   
    }
}

   

   


    }else{
      comment = new CommentCourse({ text, parent: parentComment._id,course:course,user,UserName:userdetil.name });
      parentComment.children.push(comment._id);
      console.log("ccccccc");

      await parentComment.save();
          await comment !=undefined && comment.save();

    }
     
    } else {
      comment = new CommentCourse({  course:req.params.id,
        parent:req.body.parent,
            text: req.body.text,
            user:req.body.user,
            UserName:userdetil.name
         
          });
      await comment.save();

    }
    // await comment !=undefined && comment.save();
//  console.log("ali", db.collections.comments.deleteMany({}));

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }



}


async getAllCommentsforClinnt(req,res){
  const id = req.params.id;
  if(id==undefined ){
    const list =await CommentCourse.find()
    const   FilterCommentTre=list?.filter(item=>item.commpleted==true)
    console.log("[=================]",list);
    res.send(FilterCommentTre)
  }else{
    let com=[]
  const list =await CommentCourse.find()
  const   FilterCommentTre=list?.filter(item=>item.commpleted==true)

  console.log("[=================]",list);
res.send(FilterCommentTre)

  }


}
async getAllCommentsforAdmin(req,res){
  const id = req.params.id;
  if(id==undefined ){
    const list =await CommentCourse.find()
   

    res.send(list)
  }else{
   
  const list =await CommentCourse.find()

res.send(list)

  }


}


async listCourseCompletedTue(req,res){
  const id = req.params.id;


const findComment = await CommentCourse.findById(id);


console.log("findComment",findComment);
findComment.commpleted=true
   await findComment.save();
   res.send(true)
}

}

module.exports = new CoursesController();
