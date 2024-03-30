const express = require("express")
const { getUser,updateUser,deleteUser, getUserinfo,signOut, getUsers} = require("../controllers/user.controller")
const verifyToken = require("../utils/verifyToken")

const router = express.Router()


router.get("/test",getUser)
router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,deleteUser)
router.post("/signout",signOut)

router.get("/getusers",verifyToken,getUsers)
router.get("/:userId",getUserinfo)

module.exports = router