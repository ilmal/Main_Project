const { Router } = require("express")

const router = require("express").Router()

const homePage = require("../../controllers/user/home")
const signupPage = require("../../controllers/user/signup")
const loginPage = require("../../controllers/user/login")


router.use("/home", homePage)
router.use("/signup", signupPage)
router.use("/login", loginPage)


module.exports = router