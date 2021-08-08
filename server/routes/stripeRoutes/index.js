const router = require("express").Router()

const stripe = require("../../controllers/stripe")

router.use("/", stripe)

module.exports = router
