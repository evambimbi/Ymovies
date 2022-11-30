const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  name: { type: String},
  body: { type: String},
});

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;