const router = require('express').Router();
// const multer = require("multer");
const controller = require("../http/controller/AllThechersControler");
// const TeacherAdmin = require('../http/midelware/TeacherAdmin');
// const Auth = require('../http/midelware/Auth');

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null,  Date.now()+"-"+file.originalname)
//     }
// })
   
// var upload = multer({ storage: storage })


router.get('/', controller.getList);
router.get('/:id', controller.getOne);
router.get('/alluser', controller.alluser);

router.delete('/usersdelet/:id',controller.deletUser)
router.put('/upadteuser/:id',controller.updateUser)
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
// router.post('/login', controller.login);
// router.post('/course/addCourse',[Auth,TeacherAdmin,upload.single("coursephoto")],controller.addCourse)
// router.get('/course/courselist',[Auth,TeacherAdmin],controller.Courselist)
// router.delete('/course/coursedelet/:courseid',[Auth,TeacherAdmin],controller.Coursedelet)
// router.put('/course/courseupdate/:courseid',[Auth,TeacherAdmin],controller.Courseupdate)



module.exports = router;
