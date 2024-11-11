const _ = require("lodash");
const bcrypt = require("bcrypt");
const AllThechermodel = require("../../models/AllCoursers");
const UserModel= require("../../models/User")

const {
  validateCreateTeacher,
  validateUpdateTeacher,
  loginValidator,
  CourseValidator,
} = require("../validator/AllthecherValidator");
const { validateCreateUser } = require("../validator/UserValidator");
class AllThechersControler {
  async getList(req, res) {
    const list = await AllThechermodel.find()
      .select("name description userstudent pic date email course adminUsername")
      .limit(20);
    res.send(list);
  }

  async alluser(req,res){
    const list = await UserModel.find()
    .select("name description userstudent pic date email course adminUsername basket")
    .limit(20);
  res.send(list);
    // res.send("ali")
  }
 async deletUser(req,res){
   const id=req.params.id;
   const result=await UserModel.findByIdAndRemove(id)
   res.status(200).send("delet");

 }
  
  async getListForUser(req, res) {
    const list = await AllThechermodel.find()
      .select("name description userstudent pic date course")
      .limit(20);
    res.send(list);
  }
  async getOne(req, res) {
    const id = req.params.id;
    const data = await AllThechermodel.findById(id).select(
      "-adminUsername -adminPassword"
    );
    if (!data) return res.status(404).send("مدرس مورد نظر یافت نشد");
    res.send(data);
  }


  async getOneForUser(req, res) {
    const id = req.params.id;
    const data = await AllThechermodel.findById(id).select(
      "-adminUsername -adminPassword"
    );
    if (!data) return res.status(404).send("مدرس مورد نظر یافت نشد");
    res.send(data);
  }


  async addcommentteacher(req,res){
    const id = req.params.id;
    const data = await AllThechermodel.findById(id);
    if(!data) return res.status(400).send("مدرس مورد نظر یافت نشد");

    const body = {
      user : req.body.user,
      text : req.body.text,
      score : req.body.score
    }
    data.comment.push(body)
    await data.save();
    res.send(true);

  }

  async addcommentcourse(req,res){

    const teacher = await AllThechermodel.findOne({adminUsername : req.user.username });    
    if(!teacher) return res.status(404).send("کاربر استادی با این نام یافت نشد");
   
    const courseid = req.params.id;
    const courseFound= teacher.course.id(courseid)
    console.log("slm",courseFound.comment);
    
    const body = {
      user : req.body.user,
      text : req.body.text,
      score : req.body.score
    }
    courseFound.comment.push(body)
    await teacher.save();
    res.send(true);

  }
  

  async addCoursevideo(req,res){
    console.log("user",req.user);
    const teacher = await AllThechermodel.findOne({adminUsername : req.user.username });    
    if(!teacher) return res.status(404).send("کاربر استادی با این نام یافت نشد");
    
    const courseid = req.params.id;
    const courseFound= teacher.course.id(courseid)
    console.log("slm",courseFound.video);
    // const {error }= CourseValidator(req.body);
    // if(error) return res.status(400).send(error.message);
    const url = req.protocol + '://' + req.get('host')
    courseFound.video.push({..._.pick(req.body,["title","teacher","indexvideo","timeVideo","video","coursename"]),video :  url + '/public/' + req.file.filename});
    await teacher.save();
    res.status(200).send(true);
  }

  async showCourse(req,res){
    console.log("user",req.user);

    const teacher = await AllThechermodel.findOne({adminUsername : req.user.username });    
    if(!teacher) return res.status(404).send("کاربر استادی با این نام یافت نشد");
    
    const courseid = req.params.id;
    const courseFound= teacher.course.id(courseid)
    console.log("slm",courseFound.video);
    res.send(courseFound.video)
  }















  async create(req, res) {
    const { error } = validateCreateTeacher(req.body);
    if (error) return res.status(400).send(error.message);
    let teacher = new AllThechermodel(
      _.pick(req.body, [
        "name",
        "description",
        "email",
        "pic",
        


        "adminUsername",
        "adminPassword",
      ])
    );
    const salt = await bcrypt.genSalt(10);
    teacher.adminPassword = await bcrypt.hash(teacher.adminPassword, salt);
    // teacher.adminUsername = await bcrypt.hash(teacher.adminUsername, salt);

    teacher = await teacher.save();
    res.send(
      _.pick(teacher, [ "name", "description", "email","pic","id","date"])
    );
    // res.send(teacher);
  }




 async updateUser(req,res){
  const id = req.params.id;

  const { error } = validateCreateUser(req.body);
  if (error) return res.status(400).send({ message: error.message });

  let user = await UserModel.findOne({ email: req.body.email });

  console.log("user",user);

  if (user)
    return res
      .status(400)
      .send({ message: 'کاربری با این ایمیل وجود دارد' });
      let userapdate = await UserModel.findByIdAndUpdate(id, {
        $set: _.pick(req.body, [
          "name","email","password"
        ]),
      },{new:true});
  const salt =await bcrypt.genSalt(10);
  userapdate.password = await bcrypt.hash(userapdate.password,salt);
  userapdate = await userapdate.save();
  res.send(
    _.pick(userapdate, ["name","email"])
  );
  // res.send("true")

 }
  
  async update(req, res) {
    const id = req.params.id;
    const { error } = validateUpdateTeacher(req.body);
    if (error) return res.status(400).send(error.message);
    let result = await AllThechermodel.findByIdAndUpdate(id, {
      $set: _.pick(req.body, [
        "name",
        "description",
"email"
,"pic",
        "adminUsername",
        "adminPassword",
      ]),
    },{new:true});
    const salt = await bcrypt.genSalt(10);
    result.adminPassword = await bcrypt.hash(result.adminPassword, salt);
    result = await result.save();

    if (!result) return res.status(404).send("not found");
    res.send(
      _.pick(result, ["name", "description", "adminUsername","email","pic"])
    );
  }
  async delete(req, res) {
    const id = req.params.id;
    const result = await AllThechermodel.findByIdAndRemove(id);
    res.status(200).send("delet");
  }
  async login(req, res) {
    const { error } = loginValidator(req.body);
    if (error) return res.status(400).send({ message: error.message });
    let teacher = await AllThechermodel.findOne({
      adminUsername: req.body.username,
    });
    if (!teacher)
      return res
        .status(400)
        .send({ message: "استاد گرامی کاربری با این نام کاربری یا پسورد یافت نشد" });

    const result = await bcrypt.compare(
      req.body.password,
      teacher.adminPassword
    );
    if (!result)
      return res
        .status(400)
        .send({ message: "استاد گرامی کاربری با این نام کاربری یا پسوردوارد شده یافت نشد" });
        const token = teacher.generateAuthToken();
    res.header("access-control-expose-headers","x-auth-token").header('x-auth-token', token).status(200).send({ success: true });

  }


  async addCourse(req,res){
    const teacher = await AllThechermodel.findOne({adminUsername : req.user.username });    
    if(!teacher) return res.status(404).send("کاربر استادی با این نام یافت نشد");
    const {error }= CourseValidator(req.body);
    if(error) return res.status(400).send(error.message);
    console.log("user");

    const url = req.protocol + '://' + req.get('host')
    teacher.course.push({..._.pick(req.body,["name","description","price","timeCourse","teacherAdmin","pic"]),pic :  url + '/public/' + req.file.filename});
    await teacher.save();
    res.status(200).send(true);
  }
  
  

  async Courselist(req,res){
    const teacher = await AllThechermodel.findOne({adminUsername : req.user.username });    
    if(!teacher) return res.status(404).send("کاربر استادی با این نام یافت نشد");
    res.send( teacher.course)
  }

  async Coursedelet(req,res){
    const teacher = await AllThechermodel.findOne({adminUsername : req.user.username });    
    if(!teacher) return res.status(404).send("کاربر استادی با این نام یافت نشد");
    const courseid = req.params.courseid;
   const courseFound= teacher.course.id(courseid)
   if(courseFound){
     courseFound.remove()
   }
    await teacher.save()
    res.status(200).send("delet");
  }
  async Courseupdate(req,res){
    const teacher = await AllThechermodel.findOne({adminUsername : req.user.username });    
    if(!teacher) return res.status(404).send("کاربر استادی با این نام یافت نشد");
    const {error }= CourseValidator(req.body);
    if(error) return res.status(400).send(error.message);
    const courseid = req.params.courseid;
    const courseFound= teacher.course.id(courseid)
    if(courseFound){

      if(req.body.name){
        courseFound.name=req.body.name
      }if(req.body.description){
        courseFound.description=req.body.description


      } if(req.body.pic){
        courseFound.pic=req.body.pic


      }if(req.body.price){
        courseFound.price=req.body.price


      }
       if(req.body.timeCourse){
        courseFound.timeCourse=req.body.timeCourse


      }
       if(req.body.teacherAdmin){
        courseFound.teacherAdmin=req.body.teacherAdmin


      }
     
  
    }
  
  await teacher.save()
    res.status(200).send(true)
   


  }


}

module.exports = new AllThechersControler();
