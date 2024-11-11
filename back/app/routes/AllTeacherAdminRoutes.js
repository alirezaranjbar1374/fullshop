const router = require('express').Router();
const multer = require("multer");
const controller = require("../http/controller/AllThechersControler");
const controllerproduct=require("../http/controller/ProductControler");
const TeacherAdmin = require('../http/midelware/TeacherAdmin');
const Auth = require('../http/midelware/Auth');

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
        if (file.mimetype == "image/png" ||
             file.mimetype == "image/jpg" ||
              file.mimetype == "image/webp" || 
             file.mimetype == "video/mp4" || 
             file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png,.webp, .jpg and .jpeg format allowed!'));
        }
    }
});

// router.get('/', controller.getList);
// router.get('/:id', controller.getOne);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.delete('/:id', controller.delete);
router.get('/alluser', controller.alluser);

router.post('/login', controller.login);
router.post('/course/addCourse',[Auth,TeacherAdmin,upload.single("coursephoto")],controller.addCourse)
router.get('/course/:id',[Auth,TeacherAdmin], controller.showCourse);




router.post("/CreateProductComment/:id",controllerproduct.CreateProductComment)
router.get("/datawishlist/:id",controllerproduct.Datawishlist)
router.get("/getUserComments",controllerproduct.getUserComments)
router.get("/getProductComments",controllerproduct.getProductComments)
router.post("/Completedcoments",controllerproduct.Completedcoments)
router.get('/fecthwish',controllerproduct.Fecthwish)
router.get('/getBasketWithProducts',controllerproduct.getBasketWithProducts)


router.post("/createWishlist",controllerproduct.CreateWishlist)

router.get('/listproduct', controllerproduct.Getdataproduct)
router.get('/listproduct/:title', controllerproduct.Getfinddetilproduct)
router.get('/FindUserBasket/:userId', controllerproduct.FindUserBasket)
router.post('/additembasket', controllerproduct.Additembasket)
router.post('/removeItemFromBasket', controllerproduct.RemoveItemFromBasket)
router.get('/findquantity/:userId', controllerproduct.findquantity)
router.get('/findquantityall/:userId', controllerproduct.findquantityall)


router.get('/finduser/:id',controllerproduct.finduser)
router.post('/updateUserDetil',controllerproduct.updateUserDetil)




router.get('/listproductbefordetile', controllerproduct.GetdataproductBefore)
router.post("/createproductbeforedetile",[upload.single("coverasli")],controllerproduct.CreateproductBeForeAdd)
router.post("/createproductAdd",[upload.single("coverasli")],controllerproduct.CreateproductAdd)
router.post("/createproductdetil/:id",[upload.fields([ { name: 'coverasli', maxCount: 10 },
    { name: 'additionalImages', maxCount: 10 } ,
{ name: 'video', maxCount: 10 }])],controllerproduct.CreateproductDetil)






router.get('/course/courselist',[Auth,TeacherAdmin],controller.Courselist)
router.delete('/course/coursedelet/:courseid',[Auth,TeacherAdmin],controller.Coursedelet)
router.put('/course/courseupdate/:courseid',[Auth,TeacherAdmin],controller.Courseupdate)
router.post('/addcommentcourse/:id',[Auth,TeacherAdmin], controller.addcommentcourse)
router.post('/addcoursevideo/:id',[Auth,TeacherAdmin,upload.single("coursevideo")], controller.addCoursevideo)





module.exports = router;
