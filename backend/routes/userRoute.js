const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// router.get('/createUser',createUser);
router.post("/add", userController.addUser);
router.get("/upadate", userController.apdateUserprofil);
// router.get("/add", userController.finduser);


module.exports = router;
