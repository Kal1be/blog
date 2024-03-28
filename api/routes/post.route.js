const express = require("express")
const verifyToken = require("../utils/verifyToken")
const router = express.Router()
const {create,getPost,deletePost} = require("../controllers/post.controllers")

router.post("/create",verifyToken,create)
router.get("/getposts",getPost)
router.delete("/deletepost/:postId/:userId",verifyToken,deletePost)


module.exports = router