const express = require('express');
const router = express.Router();
const User = require('../models/UserList');
var multer = require('multer');
var DIR = './uploads';
var upload = multer({ dest: DIR }).single('myFile');
var path = require('path');

router.post('/register', upload, (req, res, next) => {
   path = '';
  // upload(req, res, function (err) {
  //   if (err) {
  //     console.log(err);
  //     return res.status(422).send("an Error occured")
  //   }
  //   console.log(req.file.path)
  //   path = req.file.path;
  //   return res.status(200).json({ path: path });
  // });
  console.log(req.file+"@@@@@@@@@@@@@@@@@@@@path");

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    path  : req.file.path
  });

  console.log(req.body.name)
  console.log(user.email + "userobj")

  user.save()
    .then(result => {
      res.status(201).json({ message: "user created", result: result, path: path });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error: error });
    })
});

// router.post('/uploadfile', (req, res, next) => {
//   //var path = '';

//   upload(req, res, function (err) {
//     if (err) {
//       console.log(err);
//       return res.status(422).send("an Error occured")
//     }
//     console.log(req.file.path)
//     path = req.file.path;
//     return res.status(200).json({ path: path });
//   });
// });






module.exports = router;