const userModel = require("../models/userModel");

exports.addUser = (req, res, next) => {
  userModel.findOne({email : req.body.email})
  .then((user)=>{
    if(user === null){
       const user = new userModel({
         name: req.body.name,
         email: req.body.email,
         picture: req.body.picture,
       })
       user
         .save()
         .then((user) => res.status(201).json({ user }))
         .catch((error) => {
           console.log(error);
           res.status(400).json({ error });
         });
    }else{
      res.status(200).json({message : "l'utilisateur existe déjà"})
    }
  })
  .catch((error) =>{ res.status(400).json({error})})

    
};


