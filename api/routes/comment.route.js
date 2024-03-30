const express = require("express")
const verifyToken = require("../utils/verifyToken")
const {createComment,getPostComments,likeComment,editComment} = require("../controllers/comment.controllers")

const router = express.Router()


router.post("/create",verifyToken,createComment)

router.get("/getpostcomments/:postId",getPostComments)
router.put("/likeComment/:commentId",verifyToken,likeComment)
router.put("/editComment/:commentId",verifyToken,editComment)

module.exports = router