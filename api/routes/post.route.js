const express = require("express")
const verifyToken = require("../utils/verifyToken")
const router = express.Router()
const {create,getPost,deletePost,updatePost} = require("../controllers/post.controllers")

router.post("/create",verifyToken,create)
router.get("/getposts",getPost)
router.put("/updatepost/:postId/:userId",verifyToken,updatePost)
router.delete("/deletepost/:postId/:userId",verifyToken,deletePost)


module.exports = router