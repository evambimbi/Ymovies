const userModel = require("../models/userModel");

// const createUser =(req,res,next)=>{

// }
exports.addUser = (req, res, next) => {
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
  });
  user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};
