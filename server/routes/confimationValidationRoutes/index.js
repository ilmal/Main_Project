const router = require("express").Router()

const confirmationValidation = require("../../controllers/confirmationValidation")

router.use("/", confirmationValidation)

module.exports = router
