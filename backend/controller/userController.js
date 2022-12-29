const userModel = require("../models/userModel");

exports.addUser = (req, res, next) => {
  userModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        const user = new userModel({
          name: req.body.name,
          email: req.body.email,
          picture: req.body.picture,
          ...req.body,
        });
        user
          .save()
          .then((user) => res.status(201).json({ user }))
          .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
          });
      } else {
        res.status(200).json({ user });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.apdateUserprofil = (req, res, next) => {
   userModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
     .then(() => res.status(200).json({ message: "donnees modifié !" }))
     .catch((error) => res.status(400).json({ error }));
};

exports.userData = (req, res, next)=>{
 userModel
   .findOne({ email: req.body.email })
   .then((user) => res.status(200).json(user))
   .catch((error) => {
     res.status(400).json({ error });
   });

}
exports.userInfo = (req, res, next) => {
  userModel.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};
