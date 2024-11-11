const router = require('express').Router();
const controller = require("../http/controller/AllThechersControler");
const userController = require('../http/controller/UserController');
const Auth = require('../http/midelware/Auth');
const user = require('../http/midelware/User');

// const TeacherAdmin = require('../http/midelware/TeacherAdmin');
// const Auth = require('../http/midelware/Auth');
router.post('/login', userController.login);
router.get('/sendCode',Auth,userController.login1);
router.post('/loginbeforeVerfy',userController.loginbeforeVerfy)
router.post('/verifayUser', userController.verifayUser);


router.post('/register', userController.register);
router.post('/registerproduct', userController.registerproduct);
router.post('/loginproduct', userController.loginproduct);


router.post('/verfiayfaraz', userController.verfiayfaraz);



router.get('/getlistteacher', controller.getListForUser);
router.get('/listteacherdetil/:id', controller.getOneForUser);
router.post('/addcomntteacher/:id',controller.addcommentteacher)
// router.get('/getlistusers',controller.listusers);
router.get('/userdetil/:id',[Auth,user],userController.userdetil);

router.post('/updateBasket',[Auth,user],userController.updateBasket)
router.get('/getbasket',[Auth,user],userController.getbasket)
router.get('/checkoutbasket',[Auth,user],userController.checkoutbasket)
router.get('/veriyfaypayment',userController.veriyfaypayment)
router.get("/payment/:paymentCode",userController.getPaymentDetil)




// router.post('/addcommentcourse/:id',[Auth,TeacherAdmin], controller.addcommentcourse)





module.exports = router;
