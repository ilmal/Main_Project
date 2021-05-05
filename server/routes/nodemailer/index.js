const router = require("express").Router()

const messages = require("../../controllers/nodemailer/messages")

router.use("/messages", messages)

module.exports = router