const mongoose = require("mongoose");

const notifySchema = mongoose.Schema({
  description: { type: String, required: true },
  commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comments" },
  time: { type: String },
  userIdSender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userIdReceiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const notifyModel = mongoose.model("Notification", notifySchema);

module.exports = { Notification: notifyModel };
