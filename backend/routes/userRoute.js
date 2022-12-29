const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");


router.post("/add", userController.addUser);
router.put("/update/:id", userController.apdateUserprofil);
router.post("/getuser", userController.userData);
router.get("/getinfo/:id", userController.userInfo);



module.exports = router;
