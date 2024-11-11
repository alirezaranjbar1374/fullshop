const router = require('express').Router();
const controllerproduct=require("../http/controller/ProductControler")
const controller = require("../http/controller/AllThechersControler");
const userController = require('../http/controller/UserController');
const productController=require('../http/controller/ProductControler');
const Auth = require('../http/midelware/Auth');
const user = require('../http/midelware/User');
const multer = require("multer");



const uuidv4 = require('uuid/v4')


const DIR = 'public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,uuidv4() + '-' + fileName)
    }
});



var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
    
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" ||  file.mimetype == "image/webp" || file.mimetype == "video/mp4" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});










// const TeacherAdmin = require('../http/midelware/TeacherAdmin');
// const Auth = require('../http/midelware/Auth');
router.post('/login', userController.login);
router.get('/sendCode',Auth,userController.login1);
router.post('/loginbeforeVerfy',userController.loginbeforeVerfy)
router.post('/verifayUser', userController.verifayUser);


router.post("/CreateProductComment/:id",productController.CreateProductComment)
router.get("/datawishlist/:id",productController.Datawishlist)
router.get("/getUserComments",productController.getUserComments)
router.get("/getProductComments",productController.getProductComments)
router.post("/Completedcoments",productController.Completedcoments)




router.get('/dadatest',userController.dadatest)
router.get('/getPost',userController.getPost)
router.get('/getUserWithWishlist',userController.getUserWithWishlist)


router.post('/postSchema10',userController.postSchema10)


router.post('/registerproduct', userController.registerproduct);
router.get('/datauserproductall',userController.datauserproductall)
router.post('/loginproduct', userController.loginproduct);


router.post('/register', userController.register);
router.post('/registerrest', userController.registerrest);


router.post("/behsazan",userController.behsazan)
router.post("/behsazan1",[Auth,user],userController.behsazanDatavord)


router.get('/getlistteacher', controller.getListForUser);
router.get('/getlistteachernew', controller.getListForUsernew);

router.get('/listteacherdetil/:id', controller.getOneForUser);
router.post('/addcomntteacher/:id',controller.addcommentteacher)
// router.get('/getlistusers',controller.listusers);
router.get('/userdetil/:id',[Auth,user],userController.userdetil);

router.post('/updateBasket',[Auth,user],userController.updateBasket)
router.get('/getbasket',[Auth,user],userController.getbasket)
router.get('/checkoutbasket',[Auth,user],userController.checkoutbasket)
router.get('/veriyfaypayment',userController.veriyfaypayment)
router.get("/payment/:paymentCode",userController.getPaymentDetil)
router.get('/recptcha',userController.recptchpng)
router.post("/registerArticel",userController.registerArticel)
router.get("/articelsuserone/:id",userController.articelsuserone)
router.post("/CreateArticel/:id",[upload.single("cover")],userController.CreateArticel)
router.post("/CreateArticelComment/:id",userController.CreateArticelComment)
router.post("/CreatMeesageSait",userController.CreatMeesageSait)
router.get('/listproduct', controllerproduct.Getdataproduct)
router.get('/listproductbefordetile', controllerproduct.GetdataproductBefore)
router.post("/createproductbeforedetile",[upload.single("coverasli")],controllerproduct.CreateproductBeForeAdd)

router.post("/createproductAdd",[upload.single("coverasli")],controllerproduct.CreateproductAdd)
router.post("/createproductdetil/:id",[upload.fields([{ name: 'coverfari', maxCount: 10 },
{ name: 'video', maxCount: 10 }])],controllerproduct.CreateproductDetil)



router.post("/CreateCourseComment/:id",userController.CreateCourseComment)
router.get('/getAllCommentsforClinnt',userController.getAllCommentsforClinnt)

router.get('/getAllCommentsforAdmin',userController.getAllCommentsforAdmin)






router.get('/fecthwish',controllerproduct.Fecthwish)
router.post("/createWishlist",controllerproduct.CreateWishlist)
router.post("/CreateAnswerComment/:id",userController.CreateReplayComment)
router.post("/createComment",userController.createComment)
router.delete("/createComment/:id",userController.DeletComment)
router.get('/finduser/:id',controllerproduct.finduser)
router.post('/updateUserDetil',controllerproduct.updateUserDetil)





router.post("/CreateCommentNew",userController.CreateCommentNew)

router.post("/CreateCommentNew",userController.CreateCommentNew)
router.get("/GetCommentNew",userController.GetCommentNew)

router.get("/GetCommentNewId/:id",userController.GetCommentNewId)





router.get("/allarticels",userController.allarticels)
router.get("/allarticelsUser",userController.allarticelsUser)

router.get("/getoneAnswerComments",userController.getoneAnswerComments)
router.get("/getCommentsForPost/:postId",userController.getCommentsForPost)


router.get("/getoneComments",userController.getoneComments)


router.get("/ListComment",userController.ListComment)

router.post("/listCompletedTue/:id",userController.listCompletedTue)
router.post("/listCourseCompletedTue/:id",userController.listCourseCompletedTue)



router.get("/Allcommets",userController.Allcommets)



router.post("/CreatHello",userController.CreatHello)
router.get("/getChildComments/:commentId",userController.getChildComments)










// router.post('/addcommentcourse/:id',[Auth,TeacherAdmin], controller.addcommentcourse)





module.exports = router;




// sendEmail(email,user.name,"فراموشی رمز عبور",number,"restpass")
// sendEmail(email,user.name,"خوش آمدگویی🙂","number","wellcome")
// sendEmail(email,user.name,"پاسخ به مورد مرتبط","number","sendcountent")const router = require('express').Router();
const controllerproduct=require("../http/controller/ProductControler")
const controller = require("../http/controller/AllThechersControler");
const userController = require('../http/controller/UserController');
const productController=require('../http/controller/ProductControler');
const Auth = require('../http/midelware/Auth');
const user = require('../http/midelware/User');
const multer = require("multer");



const uuidv4 = require('uuid/v4')


const DIR = 'public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,uuidv4() + '-' + fileName)
    }
});



var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
    
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" ||  file.mimetype == "image/webp" || file.mimetype == "video/mp4" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});










// const TeacherAdmin = require('../http/midelware/TeacherAdmin');
// const Auth = require('../http/midelware/Auth');
router.post('/login', userController.login);
router.get('/sendCode',Auth,userController.login1);
router.post('/loginbeforeVerfy',userController.loginbeforeVerfy)
router.post('/verifayUser', userController.verifayUser);


router.post("/CreateProductComment/:id",productController.CreateProductComment)
router.get("/datawishlist/:id",productController.Datawishlist)
router.get("/getUserComments",productController.getUserComments)
router.get("/getProductComments",productController.getProductComments)
router.post("/Completedcoments",productController.Completedcoments)




router.get('/dadatest',userController.dadatest)
router.get('/getPost',userController.getPost)
router.get('/getUserWithWishlist',userController.getUserWithWishlist)
router.post('/postSchema10',userController.postSchema10)


router.post('/registerproduct', userController.registerproduct);
router.get('/datauserproductall',userController.datauserproductall)
router.post('/loginproduct', userController.loginproduct);


router.post('/register', userController.register);
router.post('/registerrest', userController.registerrest);


router.post("/behsazan",userController.behsazan)
router.post("/behsazan1",[Auth,user],userController.behsazanDatavord)


router.get('/getlistteacher', controller.getListForUser);
router.get('/getlistteachernew', controller.getListForUsernew);

router.get('/listteacherdetil/:id', controller.getOneForUser);
router.post('/addcomntteacher/:id',controller.addcommentteacher)
// router.get('/getlistusers',controller.listusers);
router.get('/userdetil/:id',[Auth,user],userController.userdetil);

router.post('/updateBasket',[Auth,user],userController.updateBasket)
router.get('/getbasket',[Auth,user],userController.getbasket)
router.get('/checkoutbasket',[Auth,user],userController.checkoutbasket)
router.get('/veriyfaypayment',userController.veriyfaypayment)
router.get("/payment/:paymentCode",userController.getPaymentDetil)
router.get('/recptcha',userController.recptchpng)
router.post("/registerArticel",userController.registerArticel)
router.get("/articelsuserone/:id",userController.articelsuserone)
router.post("/CreateArticel/:id",[upload.single("cover")],userController.CreateArticel)
router.post("/CreateArticelComment/:id",userController.CreateArticelComment)
router.post("/CreatMeesageSait",userController.CreatMeesageSait)
router.get('/listproduct', controllerproduct.Getdataproduct)
router.get('/listproductbefordetile', controllerproduct.GetdataproductBefore)
router.post("/createproductbeforedetile",[upload.single("coverasli")],controllerproduct.CreateproductBeForeAdd)

router.post("/createproductAdd",[upload.single("coverasli")],controllerproduct.CreateproductAdd)
router.post("/createproductdetil/:id",[upload.fields([{ name: 'coverfari', maxCount: 10 },
{ name: 'video', maxCount: 10 }])],controllerproduct.CreateproductDetil)



router.post("/CreateCourseComment/:id",userController.CreateCourseComment)
router.get('/getAllCommentsforClinnt',userController.getAllCommentsforClinnt)

router.get('/getAllCommentsforAdmin',userController.getAllCommentsforAdmin)






router.get('/fecthwish',controllerproduct.Fecthwish)
router.post("/createWishlist",controllerproduct.CreateWishlist)
router.post("/CreateAnswerComment/:id",userController.CreateReplayComment)
router.post("/createComment",userController.createComment)
router.delete("/createComment/:id",userController.DeletComment)
router.get('/finduser/:id',controllerproduct.finduser)
router.post('/updateUserDetil',controllerproduct.updateUserDetil)





router.post("/CreateCommentNew",userController.CreateCommentNew)

router.post("/CreateCommentNew",userController.CreateCommentNew)
router.get("/GetCommentNew",userController.GetCommentNew)

router.get("/GetCommentNewId/:id",userController.GetCommentNewId)





router.get("/allarticels",userController.allarticels)
router.get("/allarticelsUser",userController.allarticelsUser)

router.get("/getoneAnswerComments",userController.getoneAnswerComments)
router.get("/getCommentsForPost/:postId",userController.getCommentsForPost)


router.get("/getoneComments",userController.getoneComments)


router.get("/ListComment",userController.ListComment)

router.post("/listCompletedTue/:id",userController.listCompletedTue)
router.post("/listCourseCompletedTue/:id",userController.listCourseCompletedTue)



router.get("/Allcommets",userController.Allcommets)



router.post("/CreatHello",userController.CreatHello)
router.get("/getChildComments/:commentId",userController.getChildComments)










// router.post('/addcommentcourse/:id',[Auth,TeacherAdmin], controller.addcommentcourse)





module.exports = router;




// sendEmail(email,user.name,"فراموشی رمز عبور",number,"restpass")
// sendEmail(email,user.name,"خوش آمدگویی🙂","number","wellcome")
// sendEmail(email,user.name,"پاسخ به مورد مرتبط","number","sendcountent")