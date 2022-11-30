const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  // id_token: {type: 'string',required: true,unique: true},
  // access_token: { type: String, unique: true },
  email: { type: String, required: false },
  name: { type: String, required: true },
  picture: { type: String },
  facebook: { type: String,default: 'www.facebook.com'},
  instagram: { type: String ,default: 'www.instagram.com'},
  twitter: { type: String,default: 'www.twitter.com'}
});

const userModel = mongoose.model("User", usersSchema);

module.exports = userModel;
