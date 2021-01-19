const { Router } = require("express")

const router = require("express").Router()

const homepage = require("../../controllers/user/home")

router.use("/home", homepage)

module.exports = router