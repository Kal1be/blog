const express = require("express")
const verifyToken = require("../utils/verifyToken")
const {createComment,getPostComments,likeComment} = require("../controllers/comment.controllers")

const router = express.Router()


router.post("/create",verifyToken,createComment)

router.get("/getpostcomments/:postId",getPostComments)

router.put("/likeComment/:commentId",verifyToken,likeComment)

module.exports = router