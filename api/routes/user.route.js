const express = require("express")
const { getUser,updateUser} = require("../controllers/user.controller")
const verifyToken = require("../utils/verifyToken")

const router = express.Router()


router.get("/test",getUser)
router.put("/update/:userId",verifyToken,updateUser)

module.exports = router