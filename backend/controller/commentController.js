const commentModel = require("../models/commentModel");

exports.addComment = (req, res, next) => {
    commentModel({
      text: req.body.text,
    });
        commentModel
          .save()
          .then((comment) => res.status(201).json({ comment }))
          .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
          });
   
};