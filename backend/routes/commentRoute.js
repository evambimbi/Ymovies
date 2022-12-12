const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");

router.post("/add", commentController.createComment);
router.get("/", commentController.getAllComment);

module.exports = router;
