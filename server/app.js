var createError = require('http-errors');
var express = require('express');
const path = require('path');
const userRoutes = require('./routes/users')
var Users = require('./models/UserList')

const app = express();
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

// const multer = require('multer');
// const cors = require('cors');
// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//   cb(null, 'public/images/uploads')
//   },
//   filename: (req, file, cb) => {
//   cb(null, Date.now() + '-' + file.originalname)
//   }
//   });
//   const upload = multer({ storage })
//   app.use(cors());


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.use(logger('dev'));

//image uploading configs
app.use('./uploads', express.static('uploads'));


app.use(express.json({ extended: false }));

app.use(express.static(path.join(__dirname, './public')));




const connectDB = require('./config/db')
connectDB();
console.log("DB Connected")
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);






module.exports = app;
