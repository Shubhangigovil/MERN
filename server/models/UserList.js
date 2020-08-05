// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// // Create Schema
// const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   phone: {
//     type: Number,
//     required: true
//   },
//   path: {
//     type: String
//   }
// });


const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: String,

  email: String,
  phone: String,
  path: String
});
module.exports = mongoose.model("User", userSchema);
//module.exports = mongoose.model("UserList", UserSchema);