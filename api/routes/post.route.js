const express = require("express")
const verifyToken = require("../utils/verifyToken")
const router = express.Router()
const {create} = require("../controllers/post.controllers")

router.post("/create",verifyToken,create)


module.exports = router