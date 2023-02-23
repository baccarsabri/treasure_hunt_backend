const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const multer = require('multer');
require("dotenv").config();
require('./utils/database');
var path = require('path');
const User = require("./models/admin");



const participantRoutes = require("./router/participant");
const adminRoutes = require("./router/admin");
const questionRoutes =require('./router/question');
const adminController=require('./controller/admin');


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cookieParser());
app.use(cors());
app.use("/api/user", participantRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/question", questionRoutes);
app.use("/public", express.static(path.join(__dirname, 'public')));


const PATH = '';
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + file.originalname);
    }
});
let upload = multer({
  storage: storage
});

app.get('/api', function (req, res) {
    res.end('File catcher');
  });
  // POST File
  app.post('/api/upload', upload.single('image'), function (req, res) {
    if (!req.file) {
      console.log("No file is available!");
      return res.send({
        success: false
      });
    } else {
      console.log('File is available!');
      return res.send({
        success: true
      })
    }
  });


var admin = {
    username: "Admin123",
    password: "Admin123",
    
}
const user =  User.findOne({
  username: "Admin123",
}).then(res => {

  if(res==null){
    User.create(admin, function(e) {
  
      if (e) {
          throw e;
      }
  });
  }

});





app.listen(3000, ()=> {
    console.log('Running on port 3000');
});

//app.use('/college',collegeController);
//app.use(auth);