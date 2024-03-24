const express = require("express")
const {signup,signin,google} = require("../controllers/auth.controller")

const router = express.Router()

router.post("/signup",signup)
router.post("/google",google)
router.post("/signin",signin)

module.exports = router