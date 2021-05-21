const router = require("express").Router()

const confirmation = require("../../controllers/confirmation/")

router.use("/", confirmation)

module.exports = router
