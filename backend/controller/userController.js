
const userModel = require("../models/userModel");


exports.addUser = (req, res, next) => {
  userModel.findOne({email : req.body.email})
  .then((user)=>{
    if(user === null){
       const user = new userModel({
         name: req.body.name,
         email: req.body.email,
         picture: req.body.picture,
         ...req.body
       })
       user
         .save()
         .then((user) => res.status(201).json({ user }))
         .catch((error) => {
           console.log(error);
           res.status(400).json({ error });
         });
    }else{
      res.status(200).json({user})
    }
  })
  .catch((error) =>{ res.status(400).json({error})}) 
};

exports.apdateUserprofil=(req,res,next)=>{
  const id =req.params.user;
 
  
  const {name,email,picture,facebook,twitter,instagram}=req.body;
   console.log(id);
   console.log(req.body);
  userModel.findOneAndUpdate(
      id,
      {
        name,
        email,
        picture,
        facebook,
        twitter,
        instagram,
      },
      { new: true, returnOriginal: false }
    )
    .then(() => res.status(201).json())
    .catch((error) => {
      res.status(400).json({ error });
    });
}

