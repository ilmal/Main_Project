const { Router } = require("express")

const router = require("express").Router()

const create = require("../../controllers/mconf/create")

router.use("/", create)

module.exports = router