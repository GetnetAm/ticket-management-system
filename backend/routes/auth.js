

const express = require("express")
const {login} = require("../controller/authController")
// const {login, verify} = require("../controller/authController")
// const userRegister = require("../controller/UserSeed")
// const authMiddleware = require("../middleware/authMiddleware")
const router= express.Router()

router.post('/login', login)

// router.get('/verify', authMiddleware, verify)
// router.post('/register', userRegister)

module.exports= router;