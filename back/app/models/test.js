const { Product,ProductDetil,CommcreateWishlistent,productBeFordetil} = require('../../models/Productcred');
const {Wishlist,Userschema, Userdada}=require('../../models/Userproduct')
const UserModel= require("../../models/User")

const _ = require("lodash");

class AllproductControler {

async Getdataproduct(req,res){
  const Alldataproduct=await Product.find()
  res.send(Alldataproduct)


res.send(list);
}


async CreateproductBeForeAdd(req, res) {
  const newurl = req.protocol + '://' + req.get('host')

  let productrate = new productBeFordetil({..._.pick(req.body,[
      "title","name","href","coverasli","video",
      "price","ofprice","categori","dastbandi","numberof","color","rate"
      ,"weight"
]),coverasli :  newurl + '/public/' + req.file.filename})


productrate = await productrate.save();
  
    res.status(201).json(productrate)
  }


  async GetdataproductBefore(req,res){
    const Alldataproduct=await productBeFordetil.find()
    res.send(Alldataproduct)
  
  
  res.send(list);
  }



  async CreateproductAdd(req, res) {
    const newurl = req.protocol + '://' + req.get('host')

    let productrate = new Product({..._.pick(req.body,[
        "title","name","href","coverasli","video",
        "price","ofprice","categori","dastbandi","numberof","color","rate"
        ,"weight"
  ]),coverasli :  newurl + '/public/' + req.file.filename})
  

  productrate = await productrate.save();
    
      res.status(201).json(productrate)
    }


    
  async CreateproductDetil(req, res) {
    const id = req.params.id;

    const newurl = req.protocol + '://' + req.get('host')

    let productdetil = new ProductDetil({product:id,..._.pick(req.body,[
        "title","name","href","adress","phonenumber","video","coverfari",
       "created", "price","ofprice","categori","dastbandi","numberof","color","rate","dec"
        ,"weight","citycreate","numberofbehdasht"
  ]),coverfari :  newurl + '/public/' + req.file.filename,video :  newurl + '/public/' + req.file.filename})
  

  productdetil = await productdetil.save();
    
      res.status(201).json(productdetil)
    }


async Datawishlist(req,res){
  const { productId,user } = req.body;
  const userId = req.params.id
  const existingWishlistItem = await Wishlist.find({ user: userId });
res.send(existingWishlistItem)
}
    

async CreateWishlist(req,res){
const { productId,user } = req.body;
  const userId = user

  try {
    const existingWishlistItem = await Wishlist.findOne({ user: userId, productId: productId });
    if (existingWishlistItem) {
      console.log("existingWishlistItem");

      const findwish = await Wishlist.findOneAndDelete({ user: userId, productId: productId });
      console.log("find",findwish);

      return res.status(400).send(findwish);
    }

    // ایجاد آیتم جدید در لیست علاقه‌مندی‌ها
    const newWishlistItem = new Wishlist({
      user: userId,
      productId: productId,
      addedDate: new Date() // می‌توانیم به صورت خودکار با default تنظیم کنیم
    });

    // ذخیره آیتم جدید
    await newWishlistItem.save();

    res.status(201).send({ message: 'آیتم به لیست علاقه‌مندی‌ها اضافه شد', wishlistItem: newWishlistItem });
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }





}





  async Fecthwish(req, res) {
    try {
      // یافتن کاربران و پر کردن علاقمندی‌ها (wishlist)
      const findwish = await Userschema.find().populate("wishlist");  // فیلد درست برای پر کردن استفاده کنید
      res.status(200).send(findwish);
    } catch (error) {
      // مدیریت خطاها
      console.error(error);
      res.status(500).send({ message: "خطایی رخ داده است." });
    }
  }
  


  








  async getProductComments (req, res)  {


    const commentsWithProducts = await Comment.aggregate([
      {
        $lookup: {
          from: 'products', // نام کلکسیون محصولات
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $unwind: '$productDetails',
        // اطمینان از اینکه محصول‌ها به عنوان یک شیء اضافه شوند
      },
      // {
      //   $group: {
        
      //     averageScore: { $avg: '$score' }, // میانگین امتیاز کامنت‌ها برای هر محصول
      //     totalComments: { $sum: 1 }   // تعداد کامنت‌ها برای هر محصول
      //   }
      // },
      {
        $project: {
          UserName: 1,
          score:1,
          text:1,
          commpleted:1,
          totalComments:1,
          averageScore:1,
          'productDetails.name': 1,
         
        
          // commentproduct: { $size: "$productDetails" }, // محاسبه تعداد نظرات هر کاربر
          // comments: 1 // فقط شامل اطلاعات مورد نظر در نتیجه
        },
        
      }
      
    ]);
    

    res.send(commentsWithProducts)



    // const comments = await Comment.find()
    // .populate('product') // محصول مربوط به کامنت
    // .populate('user') // اطلاعات کاربر کامنت‌دهنده
    // .exec();
 
  };
  

  async Completedcoments (req, res)  {
    const id=req.body._id


try{
  const findComment= await Comment.findByIdAndUpdate({_id:id},{
    $set:{
      commpleted:true
    }
    })
    res.status(200).send(true)

}
catch (err) {
  console.error(err);
  res.status(500).json({ message: "Error fetching user comments" });
// findComment.commpleted=true
// await findComment.save()

  }
}






 async getUserComments (req, res)  {
  // Userschema.find()
  // .populate('comment') // پر کردن فیلد نظر (comment) در مدل کاربر
  // .then(users => {
  //   res.send(users)
  //   console.log(users);
  // })
  // .catch(err => {
  //   console.error(err);
  // });


  try {
    const results = await Userschema.aggregate([
      {
        $lookup: {
          from: "commentroducts", // نام مجموعه نظرات
          localField: "_id", // فیلد _id در مدل کاربر
          foreignField: "user", // فیلد user در مدل کامنت که به کاربر اشاره دارد
          as: "userComments" // نام فیلدی که نظرات مربوط به کاربر در آن قرار می‌گیرد
        }
      },
      {
        $unwind: {
          path: "$userComments", // تجزیه نظرات به رکوردهای جداگانه
          preserveNullAndEmptyArrays: false // اگر کاربر نظری نداشته باشد، رکورد کاربر نیز حفظ می‌شود
        }
      },
      {
        $group: {

          _id: "$_id", // گروه‌بندی بر اساس _id کاربر
          phone: { $first: "$phone" }, // گرفتن اولین ایمیل کاربر
          name: { $first: "$name" },
          
          email: { $first: "$email" }, // گرفتن اولین نام کاربر
          comments: { $push: "$userComments" } // جمع‌آوری همه نظرات کاربر
        }
      },
      {
        $project: {
          email: 1,
          name: 1,
          phone:1,
          commentCount: { $size: "$comments" }, // محاسبه تعداد نظرات هر کاربر
          comments: 1 // فقط شامل اطلاعات مورد نظر در نتیجه
        }
      }
    ]);

    res.json(results); // ارسال نتایج به کلاینت
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user comments" });
  }
};







async  finduser(req,res){
  try {
    const id = req.params.id;
    const finduser = await Userschema.findOne({ _id: id }).select('-password'); // حذف فیلد password
    res.status(200).send(finduser);
  } catch (error) {
    res.status(500).send({ message: "خطا در یافتن کاربر", error });
  }
}

async updateUserDetil(req, res) {
  const { name, email, phone, isaccept, natioancode, birthDate, ibn, _id } = req.body;

  try {
    const findComment = await Userschema.findByIdAndUpdate(
   _id,
      {
        $set: {
          name: name,
          email: email,
          phone: phone,
          natioancode: natioancode,
          birthDate: birthDate,
          ibn: ibn,
        },
      },
      { new: true } // دریافت سند به‌روز شده
    );


    res.status(200).send("findComment");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating user details" });
  }
}








async CreateProductComment(req,res,next){
  
    const id = req.params.id;
  
  
    try {
  
  
  
       // if (parent) {
      //   const parentComment = await Comment.findById(parent);
      console.log('====================================');
      console.log(req.body);
      console.log('====================================');
      const { text, parent,blog,like,dislike,user,liked,UserName } = req.body;
      
      const userdetil= await Userschema.findById(user);
      console.log("userdetil",user,userdetil);
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
        comment = new Comment({ text, parent: parentComment._id,blog:blog,user,UserName:userdetil.name,product:id,score });
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
              UserName:userdetil.name,
              score:req.body.score,
              product:id
            
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
}








module.exports = new AllproductControler();