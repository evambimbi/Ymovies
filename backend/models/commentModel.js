const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  message: { type: String, required: true },
  time: { type: String },
  idVideo: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId,ref:'User' },
  subComments: { type: Array },
});

module.exports = mongoose.model("Comments", commentSchema);
