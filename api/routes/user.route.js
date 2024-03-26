const express = require("express")
const { getUser,updateUser,deleteUser} = require("../controllers/user.controller")
const verifyToken = require("../utils/verifyToken")

const router = express.Router()


router.get("/test",getUser)
router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userid",verifyToken,deleteUser)


module.exports = router