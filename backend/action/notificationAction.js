const { Notification } = require("../models/notifyModel");

exports.createNotification = (data, funReussi, funReussiError) => {
  const notifications = new Notification({ ...data });
  console.log(data);
  notifications
    .save()
    .then((notification) =>
      Comment.findOne({ _id: notification._id })
        .populate("userId")
        .then((notification) => {
          console.log("ici:", notification);
          funReussi(notification);
        })
    )
    .catch((error) => funReussiError(error));
};
