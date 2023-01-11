const action = require("../action/notificationAction");

exports.createNotification = (req, res, next) => {
  action.createNotification(
    { ...req.body },
    (data) => {
      res.status(201).json({
        message: "Notification saved successfully!",
      });
    },

    (error) => {
      res.status(400).json({
        error: error,
      });
    }
  );
};

exports.getAllNotification = (req, res, next) => {
  Comment.find()
    .populate("userId")
    .then((Notifications) => {
      res.status(200).json(Notifications);
    })

    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
