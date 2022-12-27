const Comment = require("../models/commentModel");

exports.createComment = (data, funReussi, funReussiError) => {
  const comments = new Comment({ ...data });
  console.log(data);
  comments
    .save()
    .then((comment) => funReussi(comment))
    .catch((error) => funReussiError(error));
};

exports.getAllComment = (req, res, next) => {
  Comment.find()
    .populate("userId")
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.reply = (data, funReussi, funReussiError)=>{
   Comment.findOne({_id:data.commentId}).then((oneComment)=>{
     oneComment.subComments.push({message:data.message,userId:data.userId})
     return oneComment.save().then((comment)=>funReussi(comment))
   })
   .catch((error) =>funReussiError(error))
};
