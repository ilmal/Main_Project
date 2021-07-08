const router = require("express").Router()

const updatePassValidation = require("../../controllers/updatePassValidation/")

router.use("/", updatePassValidation)

module.exports = router