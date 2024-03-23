const express = require("express")
const { getUser } = require("../controllers/user.controller")

const router = express.Router()


router.get("/test",getUser)

module.exports = router