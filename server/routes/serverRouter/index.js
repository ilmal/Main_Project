const router = require("express").Router()

const server = require("../../controllers/server")

router.use("/", server)

module.exports = router
