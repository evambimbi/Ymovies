const express = require("express");
const router = express.Router();
const notifyController = require("../controller/notifyController");

router.post("/add", notifyController.createNotificatio);

module.exports = router;
