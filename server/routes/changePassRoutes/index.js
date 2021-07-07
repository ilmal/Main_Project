const router = require("express").Router()

const changePass = require("../../controllers/changePass/")

router.use("/", changePass)

module.exports = router