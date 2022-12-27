const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


router.post("/add", userController.addUser);
router.post("/update/:user", userController.apdateUserprofil);
router.get("/getuser", userController.userData);



module.exports = router;
