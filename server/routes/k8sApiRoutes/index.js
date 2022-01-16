const router = require("express").Router()

const handler = require("../../controllers/api/k8sApi")
const availableServerTeirs = require("../../controllers/api/availableServerTeirs")

router.use("/", handler)
router.use("/available_server_teirs", availableServerTeirs)

module.exports = router