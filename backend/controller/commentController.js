const Comment = require("../models/commentModel");

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    message: req.body.message,
    time: req.body.time,
    idVideo: req.body.idVideo,
    userId: req.body.userId,
    subComments: req.body.subComments,
  });
  comment
    .save()
    .then((data) => {
      res.status(201).json({
        message: "comment saved successfully!",
        data: data,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
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
