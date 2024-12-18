const express = require('express')
const router = express.Router();
const {handleSignUp, handleLogIn} = require("../controller/signup")


router.post("/",handleSignUp)
router.post("/login",handleLogIn)

module.exports = router