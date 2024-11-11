const { Product,ProductDetil,Comment,productBeFordetil} = require('../../models/Productcred');
const UserModel= require("../../models/User")
const { Iitembasket,Basketfull, Userschema, Wishlist } = require('../../models/UserProductnew');

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
    let additionalImagesUrls = []; 
   const id = req.params.id;
    const newurl = req.protocol + '://' + req.get('host')
    let coverasliUrl = req.files ? newurl + '/public/' + req.files.coverasli : "ssss";
    let videoUrl = req.files ? newurl + '/public/' + req.files.video : null;
    if (req.files && req.files.additionalImages) {      
      additionalImagesUrls = req.files.additionalImages.map(file => newurl + '/public/' + file.filename);
  }
    let productdetil = new ProductDetil({product:id,..._.pick(req.body,[
        "title","name","href","adress","phonenumber","video",
       "created", "price","ofprice","categori","dastbandi","numberof","color","rate","dec"
        ,"weight","citycreate","numberofbehdasht",
  ]),additionalImages:additionalImagesUrls,video : videoUrl,coverasli :  coverasliUrl})
  
  productdetil = await productdetil.save();  
      res.status(201).json(productdetil)
    }


    async Getfinddetilproduct(req,res){
      const id=req.params.title
      console.log("id",id);
      
      let findetilproduct=await ProductDetil.findOne({title:req.params.title})
      res.status(200).send(findetilproduct)
    }



    async findquantity(req,res){
      const userId = req.params.userId;
      let basket = await Basketfull.findOne({ userId: userId });
      
res.send(basket?.items)
    }

    async findquantityall(req,res){
      const userId = req.params.userId;
      let basket = await Basketfull.findOne({ userId: userId,status:"pending" });
      
res.send(basket)
    }

    


    async getBasketWithProducts  (req,res) {
      try {
        const results = await Basketfull.aggregate([
          {
            $lookup: {
              from: "productbefordetils", // نام مجموعه محصولات (باید با نام واقعی مجموعه شما مطابقت داشته باشد)
              localField: "items.productId", // فیلد productId در آرایه items
              foreignField: "_id", // فیلد _id در مدل محصول
              as: "productDetails" // نام فیلدی که جزئیات محصولات در آن قرار می‌گیرد
            }
          },
          {
            $unwind: {
              path: "$items", // تجزیه آیتم‌ها به رکوردهای جداگانه
              preserveNullAndEmptyArrays: true // اگر سبد خرید خالی باشد، رکورد سبد خرید حفظ می‌شود
            }
          },
          {
            $lookup: {
              from: "products", // نام مجموعه محصولات
              localField: "items.productId", // فیلد productId در آیتم‌ها
              foreignField: "_id", // فیلد _id در مدل محصول
              as: "itemDetails" // نام فیلدی که جزئیات آیتم‌ها در آن قرار می‌گیرد
            }
          },
          {
            $unwind: {
              path: "$itemDetails", // تجزیه جزئیات آیتم‌ها به رکوردهای جداگانه
              preserveNullAndEmptyArrays: true // اگر آیتمی جزئیات نداشته باشد، رکورد سبد خرید حفظ می‌شود
            }
          },
    
          {
            $project: {
              userId: 1,
              items: 1,
              coverasli:1,
              totalPrice: 1,
              status: 1,
              orderCreate: 1,
              orderReceive: 1
            }
          }
        ]);
      
        res.json(results); // ارسال نتایج به کلاینت
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching basket details" });
      }
    };



    async RemoveItemFromBasket(req, res) {
      const { productId, quantity } = req.body; // فرض بر این است که مقدار quantity برای کاهش تعداد ارسال می‌شود
      const userId = req.body.userId; // فرض بر این است که شناسه کاربر از توکن احراز هویت گرفته شده است
  
      try {
          // بررسی وجود سبد خرید کاربر
          let basket = await Basketfull.findOne({ userId: userId });
          console.log("basket", basket);
  
          // اگر سبد خرید وجود ندارد، پاسخ مناسب ارسال کنید
          if (!basket) {
              return res.status(404).send({ message: 'Basket not found' });
          }
  
          // بررسی وجود آیتم در سبد خرید
          const existingItemIndex = basket.items.findIndex(item => item.productId.toString() === productId);
  
          if (existingItemIndex > -1) {
              // اگر آیتم وجود دارد، تعداد آن را کاهش دهید
              if (basket.items[existingItemIndex].quantity > quantity) {
                  basket.items[existingItemIndex].quantity -= 1; // کاهش تعداد
                  console.log("Item quantity decreased.");
              } else if (basket.items[existingItemIndex].quantity === quantity) {
                  // اگر تعداد برابر با مقدار کاهش است، آیتم را از سبد خرید حذف کنید
                  basket.items.splice(existingItemIndex, 1);
                  console.log("Item removed from basket.");
              } else {
                  return res.status(400).send({ message: 'Quantity to remove exceeds current quantity' });
              }
          } else {
              return res.status(404).send({ message: 'Item not found in basket' });
          }
  
          // محاسبه قیمت کل
          basket.totalPrice = basket.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
          // ذخیره سبد خرید
          await basket.save();
  
          res.status(200).send(basket);
      } catch (error) {
          console.error('Error removing item from basket:', error);
          res.status(500).send({ message: 'Internal Server Error' });
      }
  }






    async Additembasket(req, res) {
      const { productId, title, price, quantity } = req.body;
      const userId = req.body.userId; // فرض بر این است که شناسه کاربر از توکن احراز هویت گرفته شده است
    
      try {
        // بررسی وجود سبد خرید کاربر
        let basket = await Basketfull.findOne({ userId: userId ,status:"pending"});
    console.log("basket",basket);
    
        // اگر سبد خرید وجود ندارد، یک سبد خرید جدید ایجاد کنید
        if (!basket) {
          basket = new Basketfull
          ({
            userId: userId,
            items: [],
            totalPrice: 0,
            status: 'pending'
          });
        }
//     if( basket.items.length==0){
// console.log("ayaa");
// basket.items.push({ productId, title, price, quantity ,userId});
// await basket.save();

// return 0

//     }
        // بررسی وجود آیتم در سبد خرید
        const existingItemIndex = basket.items.findIndex(item => item.productId.toString() === productId);
    
        if (existingItemIndex > -1) {
          // اگر آیتم وجود دارد، تعداد آن را افزایش دهید
          console.log('basket.items[existingItemIndex].quantity',basket.items[existingItemIndex].quantity);

          console.log('quantity',quantity);
          
          basket.items[existingItemIndex].quantity += 1;
          console.log("1");
          
        } else {
          // اگر آیتم وجود ندارد، آن را به سبد خرید اضافه کنید
          basket.items.push({ productId, title, price, quantity,userId });
          console.log("2");
          
        }
    
        // محاسبه قیمت کل
        basket.totalPrice = basket.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    
        // ذخیره سبد خرید
        await basket.save();
    
        res.status(201).send(basket);
      } catch (error) {
        console.error('Error adding item to basket:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    }





    async Additembasket1(req,res){
      
      const {productId,title,price,quantity,item,userId}=req.body
      const items = {  
        productId,title,price,quantity
          };
      // const Basketfulldata=new Basketfull({
      //   userId,item:[items]
      // })
       const ItemBasketnew = new Iitembasket({  
          productId,title,price,quantity,userId
            });
        await ItemBasketnew.save();
      
        res.status(201).send(ItemBasketnew)
        
      }
      
      
      async FindUserBasket (req,res){
        console.log("id",req.params);
        
         const id=req.params.id
         console.log("idhast",id);
         
        const findBasketItem=await Basketfull.findOne({userId:req.params.userId})
        res.status(200).send(findBasketItem)
      }


   async CreateProductComment(req,res,next){
  
        const id = req.params.id;
      
      
        try {
      
      
      
           // if (parent) {
          //   const parentComment = await Comment.findById(parent);
          console.log('====================================');
          console.log(req.body);
          console.log('====================================');
          const { text, parent,blog,like,dislike,user,liked,UserName,score } = req.body;
          
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
                  score:req.body.score,
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

    async Datawishlist(req,res){
      const { productId,user } = req.body;
      const userId = req.params.id
      const existingWishlistItem = await Wishlist.find({ user: userId });
    res.send(existingWishlistItem)
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
    
    async getProductComments (req, res)  {


      const commentsWithProducts = await Comment.aggregate([
        {
          $lookup: {
            from: 'productbefordetils', // نام کلکسیون محصولات
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
  

  async CreateWishlist(req,res){
    console.log('TESTWISH', req.body);
    
    const { productId,user } = req.body;
      const userId = user
    
      try {
        const existingWishlistItem = await Wishlist.findOne({ user: userId, productId: productId });
        if (existingWishlistItem) {
          console.log("existingWishlistItem");
    
          const findwish = await Wishlist.findOneAndDelete({ user: userId, productId: productId });
          console.log("find",findwish);
    
          return res.status(202).send("deleted");
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
    

    async  finduser(req,res){
      if(req.params.id==undefined){
        console.log("notfound");
        
        res.status(403).send("notfound")
      }
      try {
      
        const id = req.params.id;
        const finduser = await Userschema.findOne({ _id: id }).select('-password'); // حذف فیلد password
        res.status(200).send(finduser);
      } catch (error) {
        res.status(500).send("notfound");
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
}








module.exports = new AllproductControler();