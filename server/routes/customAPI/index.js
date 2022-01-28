const router = require("express").Router()

const availableServerTeirs = require("../../controllers/api/availableServerTeirs")

router.use("/availableServerTeirs", availableServerTeirs)

module.exports = router