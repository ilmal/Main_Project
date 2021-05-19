const { Router } = require("express")

const router = require("express").Router()

const user = require("../../controllers/user/user")
const userInsert = require("../../controllers/user/userInsert")
const signupPage = require("../../controllers/user/signup")
const loginPage = require("../../controllers/user/login")
const auth = require("../../controllers/user/authCheck")
const changePass = require("../../controllers/user/changePass")
const changeUserValues = require("../../controllers/user/changeUserValues")


router.use("/", user)
router.use("/insert", userInsert)
router.use("/signup", signupPage)
router.use("/login", loginPage)
router.use("/auth", auth)
router.use("/changepass", changePass)
router.use("/changeuser", changeUserValues)



module.exports = router