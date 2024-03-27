const express = require("express")
const verifyToken = require("../utils/verifyToken")
const router = express.Router()
const {create,getPost} = require("../controllers/post.controllers")

router.post("/create",verifyToken,create)
router.get("/getposts",getPost)


module.exports = router