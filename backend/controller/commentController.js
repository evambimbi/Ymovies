const Comment = require("../models/commentModel");
const action = require("../action/commentAction");

exports.createComment = (req, res, next) => {
  action.createComment(
    { ...req.body },
    (data) => {
      res.status(201).json({
        message: "comment saved successfully!",
       /*  data: data, */
      });
    },

    (error) => {
      res.status(400).json({
        error: error,
      });
    }
  );

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

exports.oneReply= (req, res, next) => {
  action.reply({...req.body},
    (data)=>{
   res.status(200).json({message:"un sous commentaire laisser"})
    
  },
  (error)=>{
    res.status(400).json({error})
  }
    )
};