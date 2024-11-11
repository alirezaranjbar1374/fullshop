const router = require('express').Router();
const AllTeacherAdminRoutes = require('./AllTeacherAdminRoutes');
const SuperAdminRoutes = require('./SuperAdminRoutes');
const UserRoutes = require('./UserRoutes');


router.use('/product', AllTeacherAdminRoutes);
router.use('/AllTeacher', SuperAdminRoutes);
router.use('/user', UserRoutes);




module.exports = router;