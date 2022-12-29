const mongoose = require("mongoose");

const subComments = mongoose.Schema({
  message: { type: String, required: true },
  time: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const commentSchema = mongoose.Schema({
  message: { type: String, required: true },
  time: { type: String },
  idVideo: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subComments: [subComments],
});

const commentModel = mongoose.model("Comments", commentSchema);
const subCommentModel = mongoose.model("SubComments", subComments);

module.exports = { Comment: commentModel, SubComment: subCommentModel };
