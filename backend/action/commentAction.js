const { Comment, SubComment } = require("../models/commentModel");

exports.createComment = (data, funReussi, funReussiError) => {
  const comments = new Comment({ ...data });
  console.log(data);
  comments
    .save()
    .then((comment) =>
      Comment.findOne({ _id: comment._id })
        .populate("userId")
        .populate({
          path: "subComments",
          model: SubComment,
          populate: { path: "userId" },
        })
        .then((comment) => {
          console.log("ici:", comment);
          funReussi(comment);
        })
    )
    .catch((error) => funReussiError(error));
};

exports.getAllComment = (req, res, next) => {
  Comment.find()
    .populate("userId")
    .populate({
      path: "subComments",
      model: SubComment,
      populate: { path: "userId" },
    })
    .then((comments) => {
      console.log("ici:", comments);
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.reply = (data, funReussi, funReussiError) => {
  Comment.findOne({ _id: data.commentId })
    .then((oneComment) => {
      oneComment.subComments.push({
        message: data.message,
        userId: data.userId,
        time: data.time,
      });
      console.log(oneComment);
      return oneComment.save().then((comment) => {
        return Comment.findOne({ _id: data.commentId })
          .populate("userId")
          .populate({
            path: "subComments",
            model: SubComment,
            populate: { path: "userId" },
          })
          .then((comment) => {
            console.log("ici:", comment);
            funReussi(comment);
          });
      });
    })
    .catch((error) => funReussiError(error));
};
