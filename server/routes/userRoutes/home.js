const { Router } = require("express")

const router = require("express").Router()

const user = require("../../controllers/user/user")
const userInsert = require("../../controllers/user/userInsert")
const signupPage = require("../../controllers/user/signup")
const loginPage = require("../../controllers/user/login")


router.use("/", user)
router.use("/insert", userInsert)
router.use("/signup", signupPage)
router.use("/login", loginPage)


module.exports = router